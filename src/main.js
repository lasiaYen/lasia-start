import { createApp } from 'vue';
import Cookies from 'js-cookie';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
store.commit('setName', Cookies.get('user'));

app.use(router).mount('#app');
app.use(store);
