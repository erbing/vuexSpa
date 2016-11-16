import Vue from "vue";
import VueRouter from "vue-router";

//  引入 公共组件
import Head from "./components/head/head.vue";
import Slider from "./components/slider/slider.vue";
import Footer from "./components/footer/footer.vue";


Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };


const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/head', component: Head}
]

const router = new VueRouter({
  routes
})


const app = new Vue({
  router,
  components: {
  }
}).$mount('#app')

