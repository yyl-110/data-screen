// router/index.ts
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home/index.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("@/views/Product/index.vue"),
  },
  {
    path: "/modularization",
    name: "Modularization",
    component: () => import("@/views/Modularization/index.vue"),
  },
  {
    path: "/base",
    name: "Base",
    component: () => import("@/views/Base/index.vue"),
  },
  {
    path: "/system",
    name: "System",
    component: () => import("@/views/System/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
