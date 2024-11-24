<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Iniciar sesión</h1>
    <div class="col-md-6 mx-auto">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
      </form>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>

      <p class="mt-3 text-center">¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
    </div>
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
