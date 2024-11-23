<template>
    <div class="container mt-4">
      <h1>Gestión de Proveedores</h1>
      <button class="btn btn-primary mb-3" @click="abrirModal('crear')">Nuevo Proveedor</button>
      <table class="table table-hover">
        <thead class="table-primary">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proveedor in proveedores" :key="proveedor.id">
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
  
      <!-- Modal de creación/edición -->
      <div class="modal" tabindex="-1" ref="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modo === 'crear' ? 'Crear Proveedor' : 'Editar Proveedor' }}</h5>
              <button type="button" class="btn-close" @click="cerrarModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="guardarProveedor">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" id="nombre" v-model="form.nombre" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="contacto" class="form-label">Contacto</label>
                  <input type="text" id="contacto" v-model="form.contacto" class="form-control" />
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
        axios.get('http://localhost:8000/api/proveedores')
          .then(response => {
            this.proveedores = response.data;
          })
          .catch(error => {
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
        this.$refs.modal.style.display = 'block';
      },
      cerrarModal() {
        this.$refs.modal.style.display = 'none';
      },
      guardarProveedor() {
        if (this.modo === 'crear') {
          axios.post('http://localhost:8000/api/proveedores', this.form)
            .then(() => {
              this.cargarProveedores();
              this.cerrarModal();
            })
            .catch(error => {
              console.error('Error al guardar el proveedor:', error);
            });
        } else {
          axios.put(`http://localhost:8000/api/proveedores/${this.form.id}`, this.form)
            .then(() => {
              this.cargarProveedores();
              this.cerrarModal();
            })
            .catch(error => {
              console.error('Error al editar el proveedor:', error);
            });
        }
      },
      eliminarProveedor(id) {
        if (confirm('¿Estás seguro de eliminar este proveedor?')) {
          axios.delete(`http://localhost:8000/api/proveedores/${id}`)
            .then(() => {
              this.cargarProveedores();
            })
            .catch(error => {
              console.error('Error al eliminar el proveedor:', error);
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
  