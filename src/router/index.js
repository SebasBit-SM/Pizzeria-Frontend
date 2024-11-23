import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; 

import Home from '../views/Home.vue';
import Usuarios from '../views/Usuarios.vue';
import Pedidos from '../views/Pedidos.vue';
import Inventario from '../views/Inventario.vue';
import Sucursales from '../views/Sucursales.vue';
import Proveedores from '../views/Proveedores.vue';
import Login from '../views/Login.vue'; 

// Definir las rutas
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login }, 
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos,
    meta: { requiresAuth: true },
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: Inventario,
    meta: { requiresAuth: true },
  },
  {
    path: '/sucursales',
    name: 'Sucursales',
    component: Sucursales,
    meta: { requiresAuth: true },
  },
  {
    path: '/proveedores',
    name: 'Proveedores',
    component: Proveedores,
    meta: { requiresAuth: true },
  },
];

// Crear el router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware de protección de rutas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.usuarioAutenticado) {
    next('/login');
  } else {
    next(); 
  }
});

export default router;
