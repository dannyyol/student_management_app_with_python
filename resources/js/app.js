/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
// require('./partials/app.js');
window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';
import swal from 'sweetalert2';
import VueProgressar from 'vue-progressbar';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading, {
  color: 'blue',
  loader:'dots'
});

Vue.use(VueProgressar, {
  color:'rgb(143, 255, 199)',
  failedColor:'red',
  height: '3px'
});



window.swal = swal;
// sweet alert
const toast = swal.mixin({
  toast:true,
  position:'top-end',
  showConfirmButton:false,
  timer:3000
});
window.toast = toast;

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// custom event using  vue custom event
window.Fire = new Vue(); //this we help us to use it in all the applications
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
    { path: '/profile', component:  require('./components/Profile.vue').default},
    { path: '/dashboard', component:  require('./components/Dashboard.vue').default},
    { path: '/user', component:  require('./components/Users.vue').default}
  ]

  const router = new VueRouter({
    mode: 'history', //this helps to remove # fom the url
    routes // short for `routes: routes`
  })

  // Uppercase letter
  Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1) // javascript function
    // return text.toUpperCase();
  });

  //Human readable date with moment.js
  Vue.filter('myDate', function(make){
    return moment(make).format('MMMM YYYY, h:mm:ss a'); // javascript function
    // return text.toUpperCase();
  });

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});

// const app = new Vue({
//     router
//   }).$mount('#app').