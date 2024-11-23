import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import Usuarios from '../views/Usuarios.vue';
import Pedidos from '../views/Pedidos.vue';
import Inventario from '../views/Inventario.vue';
import Sucursales from '../views/Sucursales.vue';
import Proveedores from '../views/Proveedores.vue';
import Login from '../views/Login.vue'; 
import Register from '../views/Register.vue'; 

const routes = [
  { path: '/', name: 'Home', component: HomeView },  
  { path: '/login', name: 'Login', component: Login }, 
  { path: '/register', name: 'Register', component: Register }, 
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const usuarioAutenticado = localStorage.getItem('usuarioAutenticado'); 
  if (to.meta.requiresAuth && !usuarioAutenticado) {
    next('/login');
  } else {
    next();
  }
});

export default router;
