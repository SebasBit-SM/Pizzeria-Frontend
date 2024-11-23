<template>
  <div class="container">
    <h1 class="my-4">Gestión de Pedidos</h1>

    <!-- Botón para abrir el modal de creación -->
    <button class="btn btn-primary mb-3" @click="abrirModal('crear')">Nuevo Pedido</button>

    <!-- Tabla de pedidos -->
    <table class="table table-hover">
      <thead class="table-primary">
        <tr>
          <th>#</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.cliente }}</td>
          <td>{{ pedido.estado }}</td>
          <td>{{ pedido.total | formatoMoneda }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="abrirModal('editar', pedido)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="eliminarPedido(pedido.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de creación y edición de pedidos -->
    <div class="modal" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modo === 'crear' ? 'Crear Pedido' : 'Editar Pedido' }}</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarPedido">
              <div class="mb-3">
                <label for="cliente" class="form-label">Cliente</label>
                <input type="text" id="cliente" v-model="form.cliente" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="estado" class="form-label">Estado</label>
                <input type="text" id="estado" v-model="form.estado" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="total" class="form-label">Total</label>
                <input type="number" id="total" v-model="form.total" class="form-control" required />
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
      pedidos: [], // Lista de pedidos
      modo: 'crear', // Modo de operación: crear o editar
      form: {
        id: null,
        cliente: '',
        estado: '',
        total: 0,
      },
    };
  },
  mounted() {
    this.cargarPedidos();
  },
  methods: {
    cargarPedidos() {
      axios.get('http://localhost:8000/api/pedidos')
        .then(response => {
          this.pedidos = response.data;
        })
        .catch(error => {
          console.error('Error al cargar los pedidos:', error);
        });
    },
    abrirModal(modo, pedido = null) {
      this.modo = modo;
      if (modo === 'editar' && pedido) {
        this.form = { ...pedido }; // Rellenar formulario con los datos del pedido
      } else {
        this.form = { id: null, cliente: '', estado: '', total: 0 }; // Limpiar formulario
      }
      this.$refs.modal.style.display = 'block';
    },
    cerrarModal() {
      this.$refs.modal.style.display = 'none';
    },
    guardarPedido() {
      if (this.modo === 'crear') {
        // Crear nuevo pedido
        axios.post('http://localhost:8000/api/pedidos', this.form)
          .then(() => {
            this.cargarPedidos();
            this.cerrarModal();
          })
          .catch(error => {
            console.error('Error al crear el pedido:', error);
          });
      } else {
        // Editar pedido
        axios.put(`http://localhost:8000/api/pedidos/${this.form.id}`, this.form)
          .then(() => {
            this.cargarPedidos();
            this.cerrarModal();
          })
          .catch(error => {
            console.error('Error al editar el pedido:', error);
          });
      }
    },
    eliminarPedido(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
        axios.delete(`http://localhost:8000/api/pedidos/${id}`)
          .then(() => {
            this.cargarPedidos();
          })
          .catch(error => {
            console.error('Error al eliminar el pedido:', error);
          });
      }
    },
  },
  filters: {
    formatoMoneda(value) {
      return `$${parseFloat(value).toFixed(2)}`;
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
