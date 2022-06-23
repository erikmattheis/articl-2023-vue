/* eslint-disable simple-import-sort/imports */
import { createRouter, createWebHistory } from "vue-router";
import createArticlPage from "@/pages/articls/create.vue";
import deleteArticlPage from "@/pages/articls/delete.vue";
import searchArticls from "@/pages/articls/index.vue";
import deleteCategoryPage from "@/pages/categories/delete.vue";
import createCategoryPage from "@/pages/categories/index.vue";
import categoryPage from "@/pages/d/index.vue";
import forgotPassPage from "@/pages/forgot-pass.vue";
import homePage from "@/pages/index.vue";
import loginPage from "@/pages/login.vue";
import deleteNote from "@/pages/notes/delete.vue";
import notFound from "@/pages/NotFound.vue";
import registerPage from "@/pages/register.vue";
import resetPasswordPage from "@/pages/reset-password.vue";
import usersPage from "@/pages/users/index.vue";
import verifyEmailPage from "@/pages/verify-email.vue";
import TabCategories from "@/components/layout/TabCategories.vue";
import TabNotes from "@/components/layout/TabNotes.vue";
import TabArticls from "@/components/layout/TabArticls.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [

    {
      name: "homePage",
      path: "/",
      component: homePage,
    },

    {
      name: "searchArticls",
      path: "/articls",
      component: searchArticls,
    },

    {
      name: "categoryPage",
      path: "/d/:slug",
      component: categoryPage,
      props: true,
      children: [{
        name: "TabCategories",
        path: "",
        component: TabCategories,
      },
      {
        name: "TabNotes",
        path: "notes",
        component: TabNotes,
        props: true,
      },
      {
        name: "TabArticls",
        path: "articls/:type?",
        component: TabArticls,
        props: true,
      }],
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
      name: "createCategoryPage",
      path: "/categories/:slug?",
      component: createCategoryPage,
    },

    {
      name: "editCategory",
      path: "/categories",
      component: createCategoryPage,
      props: true,
    },

    {
      name: "deleteCategory",
      path: "/articls",
      component: deleteCategoryPage,
      props: true,
    },

    {
      name: "editArticl",
      path: "/articls/create",
      component: createArticlPage,
      props: true,
    },

    {
      name: "createArticlPage",
      path: "/articls/create",
      component: createArticlPage,
      props: true,
    },

    {
      name: "deleteArticl",
      path: "/articls/delete",
      component: deleteArticlPage,

      meta: {
        id: true,
        title: true,
      },

      props: true,
    },

    {
      name: "deleteNote",
      path: "/notes/delete",
      component: deleteNote,
      props: true,
    },

    {
      name: "NotFound", path: "/:notFound(.*)", component: notFound,
    },
  ],
});

/*
    {
      name: "importCategoriesPage",
      path: "/categories/:slug?",
      component: importCategoriesPage,
    },
*/

export default router;
