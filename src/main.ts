import App from './App.vue';
import { createApp, ref } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index'; 
import vuetify from './plugins/vuetify';
import { _babyNames } from './plugins/axios';
import { useUsers } from './stores/modules/user';

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$axios = _babyNames;

app.use(vuetify).use(pinia).use(router).mount('#app');

const logoff = ref(false);
const userStore = useUsers();

_babyNames.interceptors.response.use(
  async response => response,
  async error => {
    if (!error.response) {
      return Promise.reject(error);
    }

    if (userStore.user && (error.response.status === 401 || error.response.status === 403)) {
      logoff.value = true;
    }

    return Promise.reject(error);
  }
);

export { logoff };