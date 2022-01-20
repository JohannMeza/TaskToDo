import { createRouter, createWebHistory } from 'vue-router';

// --- Componentes
import HomePage from './views/HomePage.vue';
import CardPage from './views/CardPage.vue';

import TableCard from './components/TableCard.vue'
import FormCard from './components/FormCard.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/activity/:name',
    name: 'CardPage',
    component: CardPage,
    children: [
      {
        path: 'table',
        name: 'TablePage',
        params: true,
        component: TableCard,
      },
      {
        path: 'agregar',
        name: 'FormCard',
        component: FormCard
      },
    ]
  },
]


const history = createWebHistory();

const router = new createRouter({
  history,
  routes
})

export default router;