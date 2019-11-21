import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue'),
    children:[
        {
            path: 'address',
            component: ()=> import('@/components/address.vue')
          }
    ],
  },
  {
    path: '/show',
    name: 'show',
    component: () => import('@/views/Show.vue')  
  },
  {
      path: '/address',
      component: ()=> import('@/components/address.vue')
  },
  {
    path: '/coupon',
    component: ()=> import('@/components/coupon.vue')
  },
]

const router = new VueRouter({
    // mode:"history",
  routes
})

export default router
