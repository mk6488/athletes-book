import {
  createRouter,
  createWebHistory
} from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import TrainingLoad from '../views/TrainingLoad.vue'
import Wellness from '../views/Wellness.vue'


const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/training-load',
    component: TrainingLoad,
    meta: {
      middleware: 'auth'
    }
  },
  {
    path: '/wellness',
    component: Wellness,
    meta: {
      middleware: 'auth'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`../middleware/${to.meta.middleware}`)
    if (middleware) {
      middleware.default(next, store)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router