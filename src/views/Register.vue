<template>
    <div class="container mt-4">
      <h1>Crear Cuenta</h1>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Registrarse</button>
      </form>
  
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
  
      <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      register() {
        if (this.email && this.password) {
          localStorage.setItem('usuarioAutenticado', JSON.stringify({ email: this.email }));
          this.$router.push('/'); 
        } else {
          this.errorMessage = 'Por favor completa todos los campos';
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
  