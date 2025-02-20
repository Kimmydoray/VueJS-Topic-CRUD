import { createApp } from 'vue'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router'  
import List from './components/ListTopic.vue';
import Add from './components/AddTopic.vue';
import Edit from './components/EditTopic.vue';

const routes = [
  { path: '/', component: List },
  { path: '/add', component: Add },
  { path: '/edit/:guid', component: Edit, props: true}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
createApp(App).use(router).mount('#app')