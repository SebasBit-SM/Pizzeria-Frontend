<template>
  <div class="container mt-5">
    <!-- Encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary">Gestión de Usuarios</h1>
      <button class="btn btn-primary btn-lg shadow" @click="abrirModal('crear')">
        <i class="bi bi-person-plus"></i> Nuevo Usuario
      </button>
    </div>

    <!-- Tabla de usuarios -->
    <div class="table-responsive shadow rounded">
      <table class="table table-hover table-bordered">
        <thead class="table-primary text-center">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id" class="align-middle text-center">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.name }}</td>
            <td>{{ usuario.email }}</td>
            <td>
              <span
                class="badge"
                :class="{
                  'bg-info': usuario.role === 'cliente',
                  'bg-success': usuario.role === 'empleado'
                }"
              >
                {{ usuario.role }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="abrirModal('editar', usuario)"
              >
                <i class="bi bi-pencil-square"></i> Editar
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="eliminarUsuario(usuario.id)"
              >
                <i class="bi bi-trash3"></i> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de creación/edición -->
    <div
      class="modal fade"
      id="modalUsuario"
      tabindex="-1"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="bi bi-person"></i>
              {{ modo === 'crear' ? 'Crear Usuario' : 'Editar Usuario' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarUsuario">
              <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="form-control border-primary shadow-sm"
                  placeholder="Ingrese el nombre completo"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="form-control border-primary shadow-sm"
                  placeholder="Ingrese el correo electrónico"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Rol</label>
                <select
                  id="role"
                  v-model="form.role"
                  class="form-select border-primary shadow-sm"
                  required
                >
                  <option value="cliente">Cliente</option>
                  <option value="empleado">Empleado</option>
                </select>
              </div>
              <div class="mb-3" v-if="modo === 'crear'">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  v-model="form.password"
                  class="form-control border-primary shadow-sm"
                  placeholder="Cree una contraseña"
                />
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-success">
                  <i class="bi bi-check-circle"></i> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [],
      modo: "crear",
      form: {
        id: null,
        name: "",
        email: "",
        role: "",
        password: "",
      },
    };
  },
  mounted() {
    this.cargarUsuarios();
  },
  methods: {
    cargarUsuarios() {
      axios
        .get("http://localhost:8000/api/usuarios")
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar usuarios:", error);
        });
    },
    abrirModal(modo, usuario = null) {
      this.modo = modo;
      if (modo === "editar" && usuario) {
        this.form = { ...usuario, password: "" };
      } else {
        this.form = { id: null, name: "", email: "", role: "", password: "" };
      }
      const modal = new bootstrap.Modal(this.$refs.modal);
      modal.show();
    },
    cerrarModal() {
      const modal = bootstrap.Modal.getInstance(this.$refs.modal);
      modal.hide();
    },
    guardarUsuario() {
      if (this.modo === "crear") {
        axios
          .post("http://localhost:8000/api/usuarios", this.form)
          .then(() => {
            this.cargarUsuarios();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error("Error al guardar usuario:", error);
          });
      } else {
        axios
          .put(`http://localhost:8000/api/usuarios/${this.form.id}`, this.form)
          .then(() => {
            this.cargarUsuarios();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error("Error al editar usuario:", error);
          });
      }
    },
    eliminarUsuario(id) {
      if (confirm("¿Estás seguro de eliminar este usuario?")) {
        axios
          .delete(`http://localhost:8000/api/usuarios/${id}`)
          .then(() => {
            this.cargarUsuarios();
          })
          .catch((error) => {
            console.error("Error al eliminar usuario:", error);
          });
      }
    },
  },
};
</script>

<style>
.table-bordered {
  border: 2px solid #0d6efd !important;
}
.table-primary {
  background-color: #cfe2ff !important;
  color: #084298;
}
.table-hover tbody tr:hover {
  background-color: #e9f2ff !important;
}
.modal-header {
  border-bottom: 2px solid #084298;
}
.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
