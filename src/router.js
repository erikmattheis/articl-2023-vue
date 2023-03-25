import { createRouter, createWebHistory } from "vue-router";
import createArticlPage from "@/pages/articls/index.vue";
import DeleteArticlPage from "@/pages/articls/delete.vue";
// import searchArticls from '@/pages/articls/search.vue';
import deleteCategoryPage from "@/pages/categories/delete.vue";
import createCategoryPage from "@/pages/categories/index.vue";
import categoryPage from "@/pages/resource/index.vue";
import forgotPassPage from "@/pages/forgot-pass.vue";
import homePage from "@/pages/index.vue";
import loginPage from "@/pages/login.vue";
import deleteNote from "@/components/layout/NotesDelete.vue";
import editNote from "@/components/layout/NotesForm.vue";
import notFound from "@/pages/NotFound.vue";
import TabQuestionsAnswers from "@/components/layout/QAndAList.vue";
import resetPasswordPage from "@/pages/change-password.vue";
import usersPage from "@/pages/users/index.vue";
import verifyEmailPage from "@/pages/verify-email.vue";
import TabCategories from "@/components/layout/CategoriesList.vue";
import TabNotes from "@/components/layout/NotesList.vue";
import ArticlsList from "@/components/layout/ArticlsList.vue";
import forbiddenPage from "@/pages/forbidden.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [

    {
      name: "homePage",
      path: "/",
      component: homePage,
    },
    /*
    {
      name: 'searchArticls',
      path: '/articls',
      component: searchArticls,
    },
*/
    {
      name: "categoryPage",
      path: "/resource/:slug",
      component: categoryPage,
      children: [{
        name: "TabCategories",
        path: "",
        component: TabCategories,
      },
      {
        name: "TabNotes",
        path: "notes",
        component: TabNotes,
        children: [
        /*

        */
          {
            name: "editNote",
            path: "edit/:id",
            component: editNote,
          },
          {
            name: "editNoteSuccess",
            path: "edited/:id",
            component: editNote,
          },
          {
            name: "deleteNote",
            path: "delete/:id",
            component: deleteNote,
          }],
      },

      {
        name: "TabQuestionsAnswers",
        path: "qa",
        component: TabQuestionsAnswers,
      },
      {
        name: "ArticlsList",
        path: "articls/:type?",
        component: ArticlsList,
      }],

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
      path: "/change-password",
      component: resetPasswordPage,
    },

    {
      name: "usersPage",
      path: "/users/:id",
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
      path: "/categories/edit/:id?",
      component: createCategoryPage,
    },

    {
      name: "deleteCategory",
      path: "/categories/delete/:slug?",
      component: deleteCategoryPage,
    },

    {
      name: "editArticl",
      path: "/articls/:editId",
      component: createArticlPage,
      props: true,
    },

    {
      name: "createArticlPage",
      path: "/articls",
      component: createArticlPage,
    },

    {
      name: "DeleteArticlPage",
      path: "/articls/delete/:id/:slug/:type/:title",
      component: DeleteArticlPage,
    },

    {
      name: "forbidden",
      path: "/forbidden",
      component: forbiddenPage,
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
