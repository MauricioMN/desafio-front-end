import Vue from "vue";
import VueRouter from "vue-router";
import Produtos from "../views/Produtos.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Produtos",
    component: Produtos,
  },
  {
    path: "/carrinho",
    name: "Carrinho",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "carrinho" */ "../views/Carrinho.vue");
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "checkout" */ "../views/Checkout.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
