import { createApp } from 'vue'
import '@/assets/tailwind.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

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
