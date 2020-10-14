import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from './pages/front/landingpage.vue';
//backend
//dashboard
import SuperadminDashboard from './pages/back/superadmin/superadmindashboard.vue';


let routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/superadmin/dashboard',
        name: 'Dashboard',
        component: SuperadminDashboard,
        meta: {
            requiresAuth: true,
        }
    },
];

export default new VueRouter({
    mode: 'history',
    routes
});
