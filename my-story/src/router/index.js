import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import publish from '@/components/publish'
import login from '@/components/login'
import me from '@/components/me'
import detail from '@/components/detail'
import about from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/me',
      name: 'me',
      component: me
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
