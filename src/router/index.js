import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import("@/components/Index")
    },
    {
      path: '/single/:id',
      name: 'Single',
      component: () => import("@/components/Single")
    },
    {
      path: '/newslists/',
      name: 'NewsLists',
      component: () => import("@/components/NewsLists"),
      children: [
        {
          path: 'com/:id',
          name: 'Com',
          component: () => import("@/components/NewsLists"),
        },
        {
          path: 'ind/:id',
          name: 'Ind',
          component: () => import("@/components/NewsLists"),
        },
      ]
    },
    {
      path: '/news/',
      name: 'News',
      component: () => import("@/components/News"),
      children: [
        {
          path: 'com/:id',
          name: 'Com',
          component: () => import("@/components/News")
        },
        {
          path: 'ind/:id',
          name: 'Ind',
          component: () => import("@/components/News")
        },
      ]
    },
    {
      path: '/productslists/:id',
      name: 'ProductsLists',
      component: () => import("@/components/ProductsLists")
    },
    {
      path: '/products/:id',
      name: 'Products',
      component: () => import("@/components/Products")
    },
    {
      path: '/gbook/',
      name: 'Gbook',
      component: () => import('@/components/Gbook')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next();
  console.log('测试下')
})

export default router