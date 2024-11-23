import { createRouter, createWebHistory } from 'vue-router';

<<<<<<< HEAD
// Importar los componentes
import Home from '../views/Home.vue';
import Pedidos from '../views/Pedidos.vue';
import Inventario from '../views/Inventario.vue';
import Sucursales from '../views/Sucursales.vue';

// Definir las rutas
=======
import Pedidos from '../views/Pedidos.vue';

>>>>>>> d7c6b34255f956f03c56d358492eb58da03a07b2
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
<<<<<<< HEAD
    component: Pedidos,
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: Inventario,
  },
  {
    path: '/sucursales',
    name: 'Sucursales',
    component: Sucursales,
  },
];
=======
    component: Pedidos
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
>>>>>>> d7c6b34255f956f03c56d358492eb58da03a07b2

// Crear el router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
