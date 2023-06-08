import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/register", component: () => import("../views/Register.vue") },
    { path: "/sign-in", component: () => import("../views/SignIn.vue") },
    { path: "/table", component: () => import("../views/Table.vue") },
  ],
});

export default router;
