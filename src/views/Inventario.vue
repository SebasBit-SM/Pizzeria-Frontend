<template>
  <div class="container">
    <h1 class="my-4">Gestión de Inventario</h1>

    <!-- Botón para abrir el modal de creación -->
    <button class="btn btn-primary mb-3" @click="abrirModal('crear')">Nuevo Material</button>

    <!-- Tabla de inventario -->
    <table class="table table-hover">
      <thead class="table-primary">
        <tr>
          <th>#</th>
          <th>Material</th>
          <th>Unidad</th>
          <th>Stock Actual</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="material in materiales" :key="material.id">
          <td>{{ material.id }}</td>
          <td>{{ material.nombre }}</td>
          <td>{{ material.unidad }}</td>
          <td>{{ material.stock_actual }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="abrirModal('editar', material)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="eliminarMaterial(material.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de creación y edición de materiales -->
    <div class="modal" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modo === 'crear' ? 'Crear Material' : 'Editar Material' }}</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarMaterial">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" id="nombre" v-model="form.nombre" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="unidad" class="form-label">Unidad</label>
                <input type="text" id="unidad" v-model="form.unidad" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="stock_actual" class="form-label">Stock Actual</label>
                <input type="number" id="stock_actual" v-model="form.stock_actual" class="form-control" required />
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
      materiales: [],
      modo: 'crear',
      form: {
        id: null,
        nombre: '',
        unidad: '',
        stock_actual: 0,
      },
    };
  },
  mounted() {
    this.cargarMateriales();
  },
  methods: {
    cargarMateriales() {
      axios.get('http://localhost:8000/api/inventario')
        .then(response => {
          this.materiales = response.data;
        })
        .catch(error => {
          console.error('Error al cargar el inventario:', error);
        });
    },
    abrirModal(modo, material = null) {
      this.modo = modo;
      if (modo === 'editar' && material) {
        this.form = { ...material };
      } else {
        this.form = { id: null, nombre: '', unidad: '', stock_actual: 0 };
      }
      this.$refs.modal.style.display = 'block';
    },
    cerrarModal() {
      this.$refs.modal.style.display = 'none';
    },
    guardarMaterial() {
      if (this.modo === 'crear') {
        axios.post('http://localhost:8000/api/inventario', this.form)
          .then(() => {
            this.cargarMateriales();
            this.cerrarModal();
          })
          .catch(error => {
            console.error('Error al crear material:', error);
          });
      } else {
        axios.put(`http://localhost:8000/api/inventario/${this.form.id}`, this.form)
          .then(() => {
            this.cargarMateriales();
            this.cerrarModal();
          })
          .catch(error => {
            console.error('Error al editar material:', error);
          });
      }
    },
    eliminarMaterial(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
        axios.delete(`http://localhost:8000/api/inventario/${id}`)
          .then(() => {
            this.cargarMateriales();
          })
          .catch(error => {
            console.error('Error al eliminar material:', error);
          });
      }
    },
  },
};
</script>

<style>
/* Estilo del modal */
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
