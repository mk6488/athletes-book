import {
  createRouter,
  createWebHistory
} from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Athlete from '../views/Athlete.vue'
import TrainingLoad from '../views/TrainingLoad.vue'
import Wellness from '../views/Wellness.vue'
import Test from '../views/Test.vue'
import Comment from '../views/Comment.vue'


const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/athlete',
    component: Athlete,
    meta: {
      middleware: 'auth'
    }
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
  {
    path: '/test',
    component: Test,
    meta: {
      middleware: 'auth'
    }
  },
  {
    path: '/comment',
    component: Comment,
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