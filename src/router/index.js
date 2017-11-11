import Vue from 'vue'
import Router from 'vue-router'
import ProgressBar from '@/components/progress-bar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Progress',
      component: ProgressBar
    }
  ]
})
