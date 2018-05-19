import Vue from 'vue'
import Router from 'vue-router'
import Timeclock from '@/components/Timeclock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Timeclock',
      component: Timeclock
    }
  ]
})
