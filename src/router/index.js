import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import TrainingLoad from '../views/TrainingLoad.vue'

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/training-load',
    component: TrainingLoad
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router