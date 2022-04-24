import { createRouter, createWebHistory } from "vue-router";

import homePage from "@/pages/index.vue";
import createArticlPage from "@/pages/articls/create.vue";
import categoryPage from "@/pages/d/index.vue";
import importCategoriesPage from "@/pages/categories/import-categories.vue";
import registerPage from "@/pages/register.vue";
import verifyEmailPage from "@/pages/verify-email.vue";
import loginPage from "@/pages/login.vue";
import forgotPassPage from "@/pages/forgot-pass.vue";
import resetPasswordPage from "@/pages/reset-password.vue";
import NotFound from "@/pages/NotFound.vue";
import usersPage from "@/pages/users/index.vue";
import createCategoryPage from "@/pages/categories/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "homePage",
      path: "/",
      component: homePage,
    },
    {
      name: "categoryPage",
      path: "/d/:slug",
      component: categoryPage,
    },
    {
      name: "registerPage",
      path: "/register",
      component: registerPage,
    },
    {
      name: "verifyEmailPage",
      path: "/verify-email",
      component: verifyEmailPage,
    },
    {
      name: "loginPage",
      path: "/login",
      component: loginPage,
    },
    {
      name: "sendVerificationEmail",
      path: "/send-verification-email",
      component: resetPasswordPage,
    },
    {
      name: "forgotPassPage",
      path: "/forgot-pass",
      component: forgotPassPage,
    },
    {
      name: "resetPasswordPage",
      path: "/reset-password",
      component: resetPasswordPage,
    },
    {
      name: "usersPage",
      path: "/users/:slug",
      component: usersPage,
    },
    {
      name: "users",
      path: "/users",
      component: usersPage,
    },
    {
      name: "importCategoriesPage",
      path: "/categories/:slug?",
      component: importCategoriesPage,
    },
    {
      name: "createCategoryPage",
      path: "/categories/:slug?",
      component: createCategoryPage,
    },
    {
      name: "createArticlPage",
      path: "/articls/create",
      component: createArticlPage,
      props: true,
    },

    { name: "NotFound", path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
