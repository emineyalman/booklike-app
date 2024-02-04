import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import '@/assets/style.css';
import store from './store';

import {appAxios} from "@/utils/appAxios"

import appHeader from '@/components/Shared/appHeader.vue';
import appBookmarkList from "@/components/BookmarkList/appBookmarkList";



const app = createApp(App);

app.config.globalProperties.$appAxios = appAxios;

app.component('appHeader', appHeader);
app.component("appBookmarkList", appBookmarkList);

app.use(store);
app.use(router);
app.mount('#app');
