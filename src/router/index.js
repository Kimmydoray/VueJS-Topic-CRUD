import Vue from 'vue';
import VueRouter from 'vue-router';
import List from '../components/List.vue';
import Add from '../components/Add.vue';
import Edit from '../components/Edit.vue';
import Delete from '../components/Delete.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: List },
  { path: '/add', component: Add },
  { path: '/edit/:id', component: Edit },
  { path: '/delete/:id', component: Delete },
];

const router = new VueRouter({
  routes,
});

export default router;