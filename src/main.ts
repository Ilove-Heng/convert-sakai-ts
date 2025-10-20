import { createApp } from 'vue'

// app
import App from './App.vue'

// vue-router
import router from './router';

// prime plugin
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

// css
import '@/assets/tailwind.css'

// Lato fonts
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

// Battambang fonts
import '@fontsource/battambang/300.css';
import '@fontsource/battambang/400.css';
import '@fontsource/battambang/700.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
})
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app')
