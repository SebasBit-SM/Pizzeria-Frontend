<template>
<<<<<<< HEAD
  <div id="app">
    <!-- Menú de navegación -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pizzería</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pedidos" class="nav-link">Pedidos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/inventario" class="nav-link">Inventario</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/sucursales" class="nav-link">Sucursales</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Vista dinámica -->
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
=======
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/pedidos">Gestion de Pedidos</router-link> |
  </nav>
  <router-view/>
>>>>>>> d7c6b34255f956f03c56d358492eb58da03a07b2
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos generales */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

.navbar {
  margin-bottom: 20px;
}
</style>
