<template>
  <div class="container mt-5">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white text-center">
        <h2>Crear Cuenta</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control border-primary"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control border-primary"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" class="btn btn-success w-100">Registrarse</button>
        </form>

        <p v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</p>

        <p class="text-center mt-3">
          ¿Ya tienes cuenta? 
          <router-link to="/login" class="text-primary text-decoration-none">Inicia sesión aquí</router-link>
        </p>
      </div>
    </div>
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
        localStorage.setItem(
          'usuarioAutenticado',
          JSON.stringify({ email: this.email })
        );
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
.card {
  border: 2px solid #0d6efd;
  border-radius: 10px;
}
.card-header {
  border-bottom: 2px solid #084298;
}
.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}
</style>
