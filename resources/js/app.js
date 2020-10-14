require('./bootstrap');
window.Vue = require('vue');

import { Form, HasError, AlertError,AlertErrors, AlertSuccess} from 'vform';
import router from './router';
import { filter } from './filter';
import storeData from "./store/index";
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import VueTelInput from 'vue-tel-input';
import VCalendar from 'v-calendar';
import moment from 'moment-timezone';
moment.tz.setDefault('Africa/Nairobi');


Vue.use(Vuex);
Vue.use(VueTelInput);
Vue.use(VCalendar, {
    locales: {
        'en-US': {
          firstDayOfWeek: 1,
          masks: {
            data: ['L', 'YYYY-MM-DD'],
          }
        }
      }
});
const store = new Vuex.Store(
    storeData
);
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


  Vue.component(HasError.name, HasError);
  Vue.component(AlertError.name, AlertError);
  Vue.component(AlertErrors.name, AlertErrors);
  Vue.component(AlertSuccess.name, AlertSuccess);
  window.Form = Form;
  window.toast = toast;



Vue.component('backendmaster', require('./components/BackendMasterComponent.vue').default);
Vue.component('frontendmaster', require('./components/FrontendMasterComponent.vue').default);
// passport
Vue.component( 'passport-clients', require('./components/passport/Clients.vue').default);
Vue.component( 'passport-authorized-clients', require('./components/passport/AuthorizedClients.vue').default);
Vue.component( 'passport-personal-access-tokens', require('./components/passport/PersonalAccessTokens.vue').default);

// import objectToFormData from "./objectToFormData";
import objectToFormData from 'object-to-formdata';
 window.objectToFormData = objectToFormData;

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        if (!store.getters.loggedIn) {
            let reroute = window.location.replace('/');
            next({
                reroute
            });
        } else{

            next();
        }
    }
    // else if (to.matched.some(record => record.meta.requiresAuth)) {
    //     // if you are logged in buton browser seem snot but if try to log
    //     // in you will be directed to dashoabrd
    //     // if logged in, redirect to specified page after loged in.
    //     if (store.getters.loggedIn) {
    //       next({
    //         name: 'About',
    //       })
    //     } else {
    //       next()
    //     }
    //   }
    else {
        next(); // make sure to always call next()!
    }
});

const app = new Vue({
    el: '#app',
    router: router,
    store: store,
});
