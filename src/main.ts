import { createApp } from 'vue'

// app
import App from './App.vue'

// vue-router
import router from './router';

// prime plugin
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import KeyFilter from 'primevue/keyfilter';
import ToastService from 'primevue/toastservice';

// custom plugins
import { AutofillPlugin } from './plugins/autofill.directive';

// Tanstack Vue Query
import { VueQueryPlugin } from '@tanstack/vue-query';

// i18n
import { i18n } from '@/i18n';

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

// public sans
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

// Roboto
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/600.css';
import '@fontsource/roboto/700.css';

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
app.use(i18n);
app.use(AutofillPlugin);
app.directive('keyfilter', KeyFilter);

app.use(VueQueryPlugin, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
            },
        },
    },
});

app.mount('#app')
