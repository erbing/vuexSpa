import Vue from "vue";
import VueRouter from "vue-router";
import Routers from "./routers/routers";

//  引入 公共组件
import Head from "./components/head/head.vue";
import Slider from "./components/slider/slider.vue";
import Footer from "./components/footer/footer.vue";

Vue.use(VueRouter);


const routers = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/head', component: Head},
]

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };


const router = new VueRouter({
  routers
})


const app = new Vue({
  router,
  components: {
  }
}).$mount('#app')

