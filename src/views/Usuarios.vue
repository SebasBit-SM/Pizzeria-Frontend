<template>
    <div class="container mt-4">
      <h1>Gestión de Usuarios</h1>
      <button class="btn btn-primary mb-3" @click="abrirModal('crear')">Nuevo Usuario</button>
      <table class="table table-hover">
        <thead class="table-primary">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.name }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.role }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="abrirModal('editar', usuario)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="eliminarUsuario(usuario.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal" tabindex="-1" ref="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modo === 'crear' ? 'Crear Usuario' : 'Editar Usuario' }}</h5>
              <button type="button" class="btn-close" @click="cerrarModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="guardarUsuario">
                <div class="mb-3">
                  <label for="name" class="form-label">Nombre</label>
                  <input type="text" id="name" v-model="form.name" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" v-model="form.email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="role" class="form-label">Rol</label>
                  <select id="role" v-model="form.role" class="form-control" required>
                    <option value="cliente">Cliente</option>
                    <option value="empleado">Empleado</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label" v-if="modo === 'crear'">Contraseña</label>
                  <input type="password" id="password" v-model="form.password" class="form-control" v-if="modo === 'crear'" />
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
        usuarios: [],
        modo: 'crear',
        form: {
          id: null,
          name: '',
          email: '',
          role: '',
          password: '',
        },
      };
    },
    mounted() {
      this.cargarUsuarios();
    },
    methods: {
      cargarUsuarios() {
        axios.get('http://localhost:8000/api/usuarios')
          .then(response => {
            this.usuarios = response.data;
          })
          .catch(error => {
            console.error('Error al cargar usuarios:', error);
          });
      },
      abrirModal(modo, usuario = null) {
        this.modo = modo;
        if (modo === 'editar' && usuario) {
          this.form = { ...usuario, password: '' };
        } else {
          this.form = { id: null, name: '', email: '', role: '', password: '' };
        }
        this.$refs.modal.style.display = 'block';
      },
      cerrarModal() {
        this.$refs.modal.style.display = 'none';
      },
      guardarUsuario() {
        if (this.modo === 'crear') {
          axios.post('http://localhost:8000/api/usuarios', this.form)
            .then(() => {
              this.cargarUsuarios();
              this.cerrarModal();
            })
            .catch(error => {
              console.error('Error al guardar usuario:', error);
            });
        } else {
          axios.put(`http://localhost:8000/api/usuarios/${this.form.id}`, this.form)
            .then(() => {
              this.cargarUsuarios();
              this.cerrarModal();
            })
            .catch(error => {
              console.error('Error al editar usuario:', error);
            });
        }
      },
      eliminarUsuario(id) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
          axios.delete(`http://localhost:8000/api/usuarios/${id}`)
            .then(() => {
              this.cargarUsuarios();
            })
            .catch(error => {
              console.error('Error al eliminar usuario:', error);
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
  