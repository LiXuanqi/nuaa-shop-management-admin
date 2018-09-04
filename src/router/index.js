import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/shop',
    component: Layout,
    redirect: '/example/table',
    name: 'Shop',
    meta: { title: '网点管理', icon: 'shop' },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/views/shop/overview/index'),
        meta: { title: '网点总览', icon: 'list', roles: ['admin'] }
      },
      {
        path: 'check',
        name: 'Check',
        component: () => import('@/views/shop/check/index'),
        meta: { title: '网点审核', icon: 'check', roles: ['admin'] }
      },
      // {
      //   path: 'add',
      //   name: 'Add',
      //   component: () => import('@/views/shop/add/index'),
      //   meta: { title: '添加网点', icon: 'tree', roles: ['admin'] }
      // },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/shop/my/index'),
        meta: { title: '我的店铺', icon: 'shop', roles: ['owner'] }
      },
      {
        path: 'reply',
        name: 'reply',
        component: () => import('@/views/shop/reply/index'),
        meta: { title: '留言回复', icon: 'reply', roles: ['owner'] }
      },
      {
        path: 'apply',
        name: 'Apply',
        hidden: true,
        component: () => import('@/views/shop/apply/index'),
        meta: { title: '申请网点', icon: 'add', roles: ['owner'] }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    redirect: '/example/table',
    name: 'Comment',
    meta: { title: '留言管理', icon: 'comment', roles: ['admin'] },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/views/comment/overview/index'),
        meta: { title: '留言总览', icon: 'list', roles: ['admin'] }
      },
      {
        path: 'check',
        name: 'Check',
        component: () => import('@/views/comment/check/index'),
        meta: { title: '留言审核', icon: 'check', roles: ['admin'] }
      }
    ]
  },

  // {
  //   path: '/account',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Account',
  //   meta: { title: '用户管理', icon: 'example', roles: ['root'] },
  //   children: [
  //     {
  //       path: 'permission',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '权限管理', icon: 'form', roles: ['root'] }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
