import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/index.vue";
import CreateArticlPage from "@/pages/articls/index.vue";
import CategoryPage from "@/pages/d/index.vue";
import RegisterPage from "@/pages/register.vue";
import VerifyEmailPage from "@/pages/verify-email.vue";
import LoginPage from "@/pages/login.vue";
import ForgotPassPage from "@/pages/forgot-pass.vue";
import ResetPasswordPage from "@/pages/reset-password.vue";
import NotFound from "@/pages/NotFound.vue";
import UserPage from "@/pages/users/index.vue";
import CreateCategoryPage from "@/pages/categories/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "HomePage",
      path: "/",
      component: HomePage,
    },
    {
      name: "CategoryPage",
      path: "/d/:slug",
      component: CategoryPage,
    },
    {
      name: "RegisterPage",
      path: "/register",
      component: RegisterPage,
    },
    {
      name: "VerifyEmail",
      path: "/verify-email",
      component: VerifyEmailPage,
    },
    {
      name: "LoginPage",
      path: "/login",
      component: LoginPage,
    },
    {
      name: "SendVerificationEmail",
      path: "/send-verification-email",
      component: ResetPasswordPage,
    },
    {
      name: "ForgotPassPage",
      path: "/forgot-pass",
      component: ForgotPassPage,
    },
    {
      name: "ResetPassword",
      path: "/reset-password",
      component: ResetPasswordPage,
    },
    {
      name: "UserPage",
      path: "/users/:slug",
      component: UserPage,
    },
    {
      name: "users",
      path: "/users",
      component: UserPage,
    },
    {
      name: "createCategoryPage",
      path: "/categories/:slug?",
      component: CreateCategoryPage,
    },
    {
      name: "createCategoryPage",
      path: "/articls",
      component: CreateArticlPage,
    },

    { name: "NotFound", path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
