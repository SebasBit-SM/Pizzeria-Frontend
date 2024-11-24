<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary">Gestión de Proveedores</h1>
      <button class="btn btn-primary" @click="abrirModal('crear')">Nuevo Proveedor</button>
    </div>
    <div class="table-responsive shadow-sm rounded">
      <table class="table table-hover table-bordered">
        <thead class="table-primary text-center">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proveedor in proveedores" :key="proveedor.id" class="align-middle text-center">
            <td>{{ proveedor.id }}</td>
            <td>{{ proveedor.nombre }}</td>
            <td>{{ proveedor.contacto }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="abrirModal('editar', proveedor)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="eliminarProveedor(proveedor.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de creación/edición -->
    <div class="modal fade" tabindex="-1" ref="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">{{ modo === 'crear' ? 'Crear Proveedor' : 'Editar Proveedor' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarProveedor">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  v-model="form.nombre"
                  class="form-control border-primary"
                  placeholder="Ingrese el nombre del proveedor"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="contacto" class="form-label">Contacto</label>
                <input
                  type="text"
                  id="contacto"
                  v-model="form.contacto"
                  class="form-control border-primary"
                  placeholder="Ingrese la información de contacto"
                />
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-success">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      proveedores: [],
      modo: 'crear',
      form: {
        id: null,
        nombre: '',
        contacto: '',
      },
    };
  },
  mounted() {
    this.cargarProveedores();
  },
  methods: {
    cargarProveedores() {
      axios
        .get('http://localhost:8000/api/proveedores')
        .then((response) => {
          this.proveedores = response.data;
        })
        .catch((error) => {
          console.error('Error al cargar los proveedores:', error);
        });
    },
    abrirModal(modo, proveedor = null) {
      this.modo = modo;
      if (modo === 'editar' && proveedor) {
        this.form = { ...proveedor };
      } else {
        this.form = { id: null, nombre: '', contacto: '' };
      }
      const modal = new bootstrap.Modal(this.$refs.modal);
      modal.show();
    },
    cerrarModal() {
      const modal = bootstrap.Modal.getInstance(this.$refs.modal);
      modal.hide();
    },
    guardarProveedor() {
      if (this.modo === 'crear') {
        axios
          .post('http://localhost:8000/api/proveedores', this.form)
          .then(() => {
            this.cargarProveedores();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error('Error al guardar el proveedor:', error);
          });
      } else {
        axios
          .put(`http://localhost:8000/api/proveedores/${this.form.id}`, this.form)
          .then(() => {
            this.cargarProveedores();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error('Error al editar el proveedor:', error);
          });
      }
    },
    eliminarProveedor(id) {
      if (confirm('¿Estás seguro de eliminar este proveedor?')) {
        axios
          .delete(`http://localhost:8000/api/proveedores/${id}`)
          .then(() => {
            this.cargarProveedores();
          })
          .catch((error) => {
            console.error('Error al eliminar el proveedor:', error);
          });
      }
    },
  },
};
</script>

<style>
/* Opcional: sombreados y bordes para mejorar estética */
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
.btn-close {
  background-color: #f8f9fa;
}
</style>
