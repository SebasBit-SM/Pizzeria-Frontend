import { createRouter, createWebHistory } from 'vue-router';

// Importar los componentes
import Home from '../views/Home.vue';
import Pedidos from '../views/Pedidos.vue';
import Inventario from '../views/Inventario.vue';
import Sucursales from '../views/Sucursales.vue';

// Definir las rutas
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
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

// Crear el router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
