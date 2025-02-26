import App from './App.vue'
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'
import DataTable from "primevue/datatable"
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // Corrected import
import Row from 'primevue/row';
import {Toolbar} from "primevue";
import Button from "primevue/button";
import Aura from '@primeuix/themes/aura';
import './assets/main.css';
import {InputText} from "primevue";
import Select from "primevue/select";
import {Password} from "primevue";

const app = createApp(App);
const pinia = createPinia()

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    }
});
app.use(pinia);

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row', Row);
app.component('ColumnGroup', ColumnGroup);
app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Select', Select);
app.component('Password', Password);
app.mount('#app');
