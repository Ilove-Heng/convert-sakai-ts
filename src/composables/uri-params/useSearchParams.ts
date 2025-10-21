import { type Ref, ref, type UnwrapRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router' 

type ParamType = string | number | boolean | null

type SearchParamsConfig<T> = {
  [K in keyof T]: {
    default: T[K]
    parse?: (value: string) => T[K]
    serialize?: (value: T[K]) => string
  }
}

export function useSearchParams<T extends Record<string, ParamType>>(
    config: SearchParamsConfig<T>
  ): { params: Ref<UnwrapRef<T>>; reset: () => void } {
    const route = useRoute()
    const router = useRouter()
    const params = ref({} as T)
  
    // Initialize default values and sync with URL
    const initializeParams = () => {
      const newParams = {} as T
      
      for (const [key, options] of Object.entries(config)) {
        const queryValue = route.query[key]
        
        if (queryValue === undefined) {
          newParams[key as keyof T] = options.default
          continue
        }
  
        if (options.parse) {
          newParams[key as keyof T] = options.parse(queryValue as string)
        } else {
          // Handle different types of parameters
          if (Array.isArray(options.default)) {
            newParams[key as keyof T] = (Array.isArray(queryValue) ? queryValue : [queryValue]) as unknown as T[keyof T]
          } else if (typeof options.default === 'boolean') {
            newParams[key as keyof T] = (queryValue === 'true') as T[keyof T]
          } else if (typeof options.default === 'number') {
            newParams[key as keyof T] = Number(queryValue) as T[keyof T]
          } else {
            newParams[key as keyof T] = queryValue as T[keyof T]
          }
        }
      }
  
      params.value = newParams as UnwrapRef<T>
    }
  
    // Watch for URL changes
    watch(
      () => route.query,
      () => initializeParams(),
      { deep: true }
    )
  
    // Watch for params changes and update URL
    watch(
      params,
      (newParams) => {
        const query = { ...route.query }
        
        for (const [key, value] of Object.entries(newParams)) {
          const options = config[key as keyof T]
          const typedValue = value as T[keyof T]
          
          if (typedValue === options.default) {
            delete query[key]
            continue
          }
  
          if (options.serialize) {
            if (typedValue !== null && typedValue !== undefined) {
              query[key] = options.serialize(typedValue)
            }
          } else if (typedValue === null) {
            delete query[key]
          } else {
            query[key] = String(typedValue)
          }
        }
  
        router.replace({ query })
      },
      { deep: true }
    )
  
    // Initial sync
    initializeParams()
  
    // Reset function
    const reset = () => {
      const defaultParams = {} as T
      for (const [key, options] of Object.entries(config)) {
        defaultParams[key as keyof T] = options.default
      }
      params.value = defaultParams as UnwrapRef<T>
    }
  
    return {
       params: params as Ref<UnwrapRef<T>, UnwrapRef<T>>,
       reset
    }
  }