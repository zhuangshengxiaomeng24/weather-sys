import Predict from './view/Predict.vue'
import My from './view/My.vue'
import Loginin from './view/Loginin.vue'
import Register from './view/Register.vue'
import Forget from './view/Forget.vue'
import Wind from './view/Wind.vue'
import Nino from './view/Nino.vue'
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/my',
    name: 'my',
    component: My
  },
  {
    path: '/predict',
    name: 'predict',
    component: Predict
  },
  {
    path: '/',
    component: Loginin
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/forget',
    component:Forget
  },
  {
    path:'/wind',
    component:Wind
  },
  {
    path:'/nino',
    component:Nino
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router