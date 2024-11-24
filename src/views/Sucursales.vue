<template>
  <div class="container mt-5">
    <!-- Título y botón -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary">Gestión de Sucursales</h1>
      <button class="btn btn-primary btn-lg shadow" @click="abrirModal('crear')">
        <i class="bi bi-plus-circle"></i> Nueva Sucursal
      </button>
    </div>

    <!-- Tabla de sucursales -->
    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered">
        <thead class="table-primary text-center">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sucursal in sucursales" :key="sucursal.id" class="align-middle text-center">
            <td>{{ sucursal.id }}</td>
            <td>{{ sucursal.nombre }}</td>
            <td>{{ sucursal.direccion }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="abrirModal('editar', sucursal)"
              >
                <i class="bi bi-pencil-square"></i> Editar
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="eliminarSucursal(sucursal.id)"
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
      id="modalSucursal"
      tabindex="-1"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="bi bi-building"></i>
              {{ modo === 'crear' ? 'Crear Sucursal' : 'Editar Sucursal' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarSucursal">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  v-model="form.nombre"
                  class="form-control border-primary shadow-sm"
                  placeholder="Ingrese el nombre de la sucursal"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  v-model="form.direccion"
                  class="form-control border-primary shadow-sm"
                  placeholder="Ingrese la dirección"
                  required
                />
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">
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
      sucursales: [],
      modo: "crear",
      form: {
        id: null,
        nombre: "",
        direccion: "",
      },
    };
  },
  mounted() {
    this.cargarSucursales();
  },
  methods: {
    cargarSucursales() {
      axios
        .get("http://localhost:8000/api/sucursales")
        .then((response) => {
          this.sucursales = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar las sucursales:", error);
        });
    },
    abrirModal(modo, sucursal = null) {
      this.modo = modo;
      if (modo === "editar" && sucursal) {
        this.form = { ...sucursal };
      } else {
        this.form = { id: null, nombre: "", direccion: "" };
      }
      const modal = new bootstrap.Modal(this.$refs.modal);
      modal.show();
    },
    cerrarModal() {
      const modal = bootstrap.Modal.getInstance(this.$refs.modal);
      modal.hide();
    },
    guardarSucursal() {
      if (this.modo === "crear") {
        axios
          .post("http://localhost:8000/api/sucursales", this.form)
          .then(() => {
            this.cargarSucursales();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error("Error al guardar sucursal:", error);
          });
      } else {
        axios
          .put(`http://localhost:8000/api/sucursales/${this.form.id}`, this.form)
          .then(() => {
            this.cargarSucursales();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error("Error al editar sucursal:", error);
          });
      }
    },
    eliminarSucursal(id) {
      if (confirm("¿Estás seguro de eliminar esta sucursal?")) {
        axios
          .delete(`http://localhost:8000/api/sucursales/${id}`)
          .then(() => {
            this.cargarSucursales();
          })
          .catch((error) => {
            console.error("Error al eliminar sucursal:", error);
          });
      }
    },
  },
};
</script>

<style>
/* Estilización única para la tabla */
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
.btn-primary:hover {
  background-color: #084298;
}
</style>
