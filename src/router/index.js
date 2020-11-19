import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/main",
    component: () => import("@/views/MainPage.vue")
  },
  {
    path: "/movie",
    component: () => import("@/views/MoviePage.vue")
  },
  {
    path: "/inform",
    component: () => import("@/views/InformPage.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
