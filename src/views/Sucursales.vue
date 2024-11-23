<template>
  <div class="container mt-4">
    <h1>Gestión de Sucursales</h1>
    <button class="btn btn-primary mb-3" @click="abrirModal('crear')">Nueva Sucursal</button>
    <table class="table table-hover">
      <thead class="table-primary">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sucursal in sucursales" :key="sucursal.id">
          <td>{{ sucursal.id }}</td>
          <td>{{ sucursal.nombre }}</td>
          <td>{{ sucursal.direccion }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="abrirModal('editar', sucursal)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="eliminarSucursal(sucursal.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de creación/edición -->
    <div class="modal" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modo === 'crear' ? 'Crear Sucursal' : 'Editar Sucursal' }}</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarSucursal">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" id="nombre" v-model="form.nombre" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" id="direccion" v-model="form.direccion" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-success">Guardar</button>
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
      sucursales: [],
      modo: 'crear',
      form: {
        id: null,
        nombre: '',
        direccion: '',
      },
    };
  },
  mounted() {
    this.cargarSucursales();
  },
  methods: {
    cargarSucursales() {
      axios.get('http://localhost:8000/api/sucursales')
        .then(response => {
          this.sucursales = response.data;
        })
        .catch(error => {
          console.error('Error al cargar las sucursales:', error);
        });
    },
    abrirModal(modo, sucursal = null) {
      this.modo = modo;
      if (modo === 'editar' && sucursal) {
        this.form = { ...sucursal };
      } else {
        this.form = { id: null, nombre: '', direccion: '' };
      }
      this.$refs.modal.style.display = 'block';
    },
    cerrarModal() {
      this.$refs.modal.style.display = 'none';
    },
    guardarSucursal() {
      if (this.modo === 'crear') {
        axios.post('http://localhost:8000/api/sucursales', this.form)
          .then(() => {
            this.cargarSucursales();
            this.cerrarModal();
          })
          .catch(error => {
            console.error('Error al guardar sucursal:', error);
          });
      } else {
        axios.put(`http://localhost:8000/api/sucursales/${this.form.id}`, this.form)
          .then(() => {
            this.cargarSucursales();
            this.cerrarModal();
          })
          .catch(error => {
            console.error('Error al editar sucursal:', error);
          });
      }
    },
    eliminarSucursal(id) {
      if (confirm('¿Estás seguro de eliminar esta sucursal?')) {
        axios.delete(`http://localhost:8000/api/sucursales/${id}`)
          .then(() => {
            this.cargarSucursales();
          })
          .catch(error => {
            console.error('Error al eliminar sucursal:', error);
          });
      }
    },
  },
};
</script>

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  margin: 10% auto;
}
</style>
