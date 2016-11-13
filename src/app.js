import Vue from "vue";
import VueRouter from "vue-router";

const Home = {
    template: '<div> this is home </div>'
};

const Comm = {
    template: '<div> this is comm </div>'
};

Vue.use(VueRouter);

const router = [
    { path: '/home', component: Home},
    { path: '/comm', component: Comm}
];


const app = new Vue({
  router
}).$mount('#app')

