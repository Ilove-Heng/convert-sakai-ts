// autofill.directive.ts
import type { App, Directive, DirectiveBinding } from 'vue'

interface AutofillConfig {
  disabled?: boolean
  type?: 'off' | 'nope' | 'new-password'
  excludeSelectors?: string[]
  includeSelectors?: string[]
}

interface AutofillElement extends HTMLElement {
  _autofillObserver?: MutationObserver
  _autofillConfig?: AutofillConfig
}

const defaultConfig: AutofillConfig = {
  disabled: true,
  type: 'off',
  excludeSelectors: [],
  includeSelectors: []
}

// Apply autofill attributes to input elements
const applyAutofillAttributes = (el: HTMLElement, config: AutofillConfig) => {
  const inputs = el.querySelectorAll('input, textarea, select')
  
  inputs.forEach((input: Element) => {
    const htmlInput = input as HTMLInputElement
    
    // Check if should be excluded
    if (config.excludeSelectors?.some(sel => htmlInput.matches(sel))) {
      return
    }
    
    // Check if should be included (if includeSelectors is specified)
    if (config.includeSelectors && config.includeSelectors.length > 0) {
      if (!config.includeSelectors.some(sel => htmlInput.matches(sel))) {
        return
      }
    }
    
    if (config.disabled) {
      htmlInput.setAttribute('autocomplete', config.type || 'off')
      htmlInput.setAttribute('data-form-type', 'other')
      
      // Additional attributes for stubborn browsers
      if (htmlInput.type === 'password') {
        htmlInput.setAttribute('autocomplete', 'new-password')
      }
      
      // Prevent autofill on inputs that might trigger it
      if (htmlInput.name) {
        htmlInput.setAttribute('data-lpignore', 'true') // LastPass
        htmlInput.setAttribute('data-1p-ignore', 'true') // 1Password
      }
    } else {
      htmlInput.removeAttribute('data-form-type')
      htmlInput.removeAttribute('data-lpignore')
      htmlInput.removeAttribute('data-1p-ignore')
      
      if (htmlInput.getAttribute('autocomplete') === config.type) {
        htmlInput.removeAttribute('autocomplete')
      }
    }
  })
}

// Setup mutation observer for dynamic content
const setupObserver = (el: AutofillElement, config: AutofillConfig) => {
  // Clean up existing observer
  if (el._autofillObserver) {
    el._autofillObserver.disconnect()
  }
  
  el._autofillObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyAutofillAttributes(node as HTMLElement, config)
          }
        })
      }
    })
  })
  
  el._autofillObserver.observe(el, {
    childList: true,
    subtree: true
  })
}

// The directive
const autofillDirective: Directive<AutofillElement, AutofillConfig | boolean> = {
  mounted(el, binding: DirectiveBinding<AutofillConfig | boolean>) {
    const config: AutofillConfig = typeof binding.value === 'boolean'
      ? { ...defaultConfig, disabled: binding.value }
      : { ...defaultConfig, ...binding.value }
    
    el._autofillConfig = config
    
    // Apply to existing inputs
    applyAutofillAttributes(el, config)
    
    // Setup observer for dynamic content (lazy-loaded, modals, teleports)
    setupObserver(el, config)
  },
  
  updated(el, binding: DirectiveBinding<AutofillConfig | boolean>) {
    const config: AutofillConfig = typeof binding.value === 'boolean'
      ? { ...defaultConfig, disabled: binding.value }
      : { ...defaultConfig, ...binding.value }
    
    el._autofillConfig = config
    applyAutofillAttributes(el, config)
  },
  
  beforeUnmount(el) {
    if (el._autofillObserver) {
      el._autofillObserver.disconnect()
      delete el._autofillObserver
    }
    delete el._autofillConfig
  }
}

// Plugin for global registration
export const AutofillPlugin = {
  install(app: App, options: AutofillConfig = {}) {
    // Merge with default config
    const globalConfig = { ...defaultConfig, ...options }
    
    // Register directive
    app.directive('autofill', autofillDirective)
    
    // Optionally apply to app root automatically
    app.mixin({
      mounted() {
        if (this.$el && this.$el.nodeType === Node.ELEMENT_NODE) {
          // Only apply to root components if they don't have the directive
          if (this.$el.parentElement === null || this.$el.parentElement.id === 'app') {
            const el = this.$el as AutofillElement
            if (!el._autofillConfig) {
              el._autofillConfig = globalConfig
              applyAutofillAttributes(el, globalConfig)
              setupObserver(el, globalConfig)
            }
          }
        }
      }
    })
  }
}

// Export directive for manual registration
export default autofillDirective

// Types export
export type { AutofillConfig, AutofillElement }

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// main.ts - Install globally
import { createApp } from 'vue'
import { AutofillPlugin } from './autofill.directive'
import App from './App.vue'

const app = createApp(App)

// Option 1: Install with default config (disables all autofill)
app.use(AutofillPlugin)

// Option 2: Install with custom config
app.use(AutofillPlugin, {
  disabled: true,
  type: 'off',
  excludeSelectors: ['.allow-autofill', '[data-autofill="true"]'],
  includeSelectors: [] // Empty means all inputs
})

app.mount('#app')
*/

/*
// Component usage without template changes
<script setup lang="ts">
import { ref } from 'vue'

// No changes needed - directive works automatically
const form = ref({
  username: '',
  password: ''
})
</script>

<template>
  <!-- Option 1: Apply to entire component root -->
  <div v-autofill>
    <input v-model="form.username" type="text" />
    <input v-model="form.password" type="password" />
  </div>

  <!-- Option 2: Apply with custom config -->
  <div v-autofill="{ disabled: true, type: 'new-password' }">
    <input v-model="form.username" />
  </div>

  <!-- Option 3: Enable autofill for specific section -->
  <div v-autofill="false">
    <input v-model="form.username" />
  </div>

  <!-- Option 4: Exclude specific inputs -->
  <div v-autofill="{ disabled: true, excludeSelectors: ['.keep-autofill'] }">
    <input v-model="form.username" />
    <input v-model="form.password" class="keep-autofill" />
  </div>

  <!-- Works with lazy-loaded components -->
  <Suspense>
    <AsyncComponent v-autofill />
  </Suspense>

  <!-- Works with teleports and modals -->
  <Teleport to="body">
    <div v-autofill class="modal">
      <input type="text" />
    </div>
  </Teleport>
</template>
*/