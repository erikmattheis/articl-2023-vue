import { createRouter, createWebHistory } from 'vue-router';

import createArticlPage from '@/pages/articls/create';
import deleteArticlPage from '@/pages/articls/delete';
import searchArticls from '@/pages/articls/index';
import createCategoryPage from '@/pages/categories/index';
import categoryPage from '@/pages/d/index';
import forgotPassPage from '@/pages/forgot-pass';
import homePage from '@/pages/index';
import loginPage from '@/pages/login';
import notFound from '@/pages/NotFound';
import registerPage from '@/pages/register';
import resetPasswordPage from '@/pages/reset-password';
import usersPage from '@/pages/users/index';
import verifyEmailPage from '@/pages/verify-email';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      name: 'homePage',
      path: '/',
      component: homePage,
    },
    {
      name: 'searchArticls',
      path: '/articls',
      component: searchArticls,
    },

    {
      name: 'categoryPage',
      path: '/d/:slug',
      component: categoryPage,
    },
    {
      name: 'registerPage',
      path: '/register',
      component: registerPage,
    },
    {
      name: 'verifyEmailPage',
      path: '/verify-email',
      component: verifyEmailPage,
    },
    {
      name: 'loginPage',
      path: '/login',
      component: loginPage,
    },
    {
      name: 'sendVerificationEmail',
      path: '/send-verification-email',
      component: resetPasswordPage,
    },
    {
      name: 'forgotPassPage',
      path: '/forgot-pass',
      component: forgotPassPage,
    },
    {
      name: 'resetPasswordPage',
      path: '/reset-password',
      component: resetPasswordPage,
    },
    {
      name: 'usersPage',
      path: '/users/:slug',
      component: usersPage,
    },
    {
      name: 'users',
      path: '/users',
      component: usersPage,
    },
    {
      name: 'createCategoryPage',
      path: '/categories/:slug?',
      component: createCategoryPage,
    },
    {
      name: 'editArticl',
      path: '/articls/create',
      component: createArticlPage,
      props: true,
    },
    {
      name: 'createArticlPage',
      path: '/articls/create',
      component: createArticlPage,
      props: true,
    },
    {
      name: 'deleteArticl',
      path: '/articls/delete',
      component: deleteArticlPage,

      meta: {
        id: true,
        title: true,
      },

      props: true,
    },
    {
      name: 'NotFound', path: '/:notFound(.*)', component: notFound,
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
