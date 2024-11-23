import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Usuarios from '../views/Usuarios.vue';
import Pedidos from '../views/Pedidos.vue';
import Inventario from '../views/Inventario.vue';
import Sucursales from '../views/Sucursales.vue';
import Proveedores from '../views/Proveedores.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/usuarios', name: 'Usuarios', component: Usuarios },
  { path: '/pedidos', name: 'Pedidos', component: Pedidos },
  { path: '/inventario', name: 'Inventario', component: Inventario },
  { path: '/sucursales', name: 'Sucursales', component: Sucursales },
  { path: '/proveedores', name: 'Proveedores', component: Proveedores },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
