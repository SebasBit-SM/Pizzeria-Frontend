<template>
    <div class="container mt-4">
      <h1>Iniciar sesión</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </form>
  
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
  
      <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '', // Para mostrar el mensaje de error
      };
    },
    methods: {
      login() {
        // Simulamos una verificación básica (esto puede conectarse a tu API de backend)
        if (this.email === 'admin@example.com' && this.password === 'password') {
          localStorage.setItem('usuarioAutenticado', JSON.stringify({ email: this.email }));
          this.$router.push('/'); // Redirige al home
        } else {
          this.errorMessage = 'Email o contraseña incorrectos'; // Mensaje de error
        }
      },
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 400px;
    margin: auto;
    padding-top: 50px;
  }
  </style>
  