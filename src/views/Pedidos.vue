<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Gestión de Pedidos</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="abrirModal('crear')">
        <i class="bi bi-plus-circle"></i> Nuevo Pedido
      </button>
      <input
        type="text"
        class="form-control w-50"
        placeholder="Buscar pedido..."
        v-model="searchQuery"
      />
    </div>
    <table class="table table-bordered table-striped table-hover">
      <thead class="table-dark text-center">
        <tr>
          <th>#</th>
          <th>Cliente</th>
          <th>Sucursal</th>
          <th>Estado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidosFiltrados" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.cliente }}</td>
          <td>{{ pedido.sucursal }}</td>
          <td>
            <span
              class="badge"
              :class="{
                'bg-warning text-dark': pedido.estado === 'pendiente',
                'bg-info': pedido.estado === 'en_preparacion',
                'bg-success': pedido.estado === 'listo',
                'bg-primary': pedido.estado === 'entregado',
              }"
            >
              {{ pedido.estado }}
            </span>
          </td>
          <td>{{ pedido.total | formatoMoneda }}</td>
          <td class="text-center">
            <button
              class="btn btn-warning btn-sm me-2"
              @click="abrirModal('editar', pedido)"
            >
              <i class="bi bi-pencil-square"></i> Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="eliminarPedido(pedido.id)"
            >
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de creación/edición -->
    <div
      class="modal fade"
      id="pedidoModal"
      tabindex="-1"
      aria-labelledby="pedidoModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="pedidoModalLabel">
              {{ modo === 'crear' ? 'Crear Pedido' : 'Editar Pedido' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="cerrarModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarPedido">
              <div class="mb-3">
                <label for="cliente" class="form-label">Cliente</label>
                <input
                  type="text"
                  id="cliente"
                  v-model="form.cliente"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="sucursal" class="form-label">Sucursal</label>
                <input
                  type="text"
                  id="sucursal"
                  v-model="form.sucursal"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="estado" class="form-label">Estado</label>
                <select
                  id="estado"
                  v-model="form.estado"
                  class="form-select"
                  required
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_preparacion">En Preparación</option>
                  <option value="listo">Listo</option>
                  <option value="entregado">Entregado</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="total" class="form-label">Total</label>
                <input
                  type="number"
                  id="total"
                  v-model="form.total"
                  class="form-control"
                  required
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="cerrarModal"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-success">
                  <i class="bi bi-save"></i> Guardar
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
      pedidos: [],
      modo: "crear",
      form: {
        id: null,
        cliente: "",
        sucursal: "",
        estado: "",
        total: 0,
      },
      searchQuery: "",
    };
  },
  mounted() {
    this.cargarPedidos();
  },
  computed: {
    pedidosFiltrados() {
      if (!this.searchQuery) {
        return this.pedidos;
      }
      return this.pedidos.filter((pedido) =>
        pedido.cliente
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    cargarPedidos() {
      axios
        .get("http://localhost:8000/api/pedidos")
        .then((response) => {
          this.pedidos = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar pedidos:", error);
        });
    },
    abrirModal(modo, pedido = null) {
      this.modo = modo;
      if (modo === "editar" && pedido) {
        this.form = { ...pedido };
      } else {
        this.form = { id: null, cliente: "", sucursal: "", estado: "", total: 0 };
      }
      const modalElement = document.getElementById("pedidoModal");
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    },
    cerrarModal() {
      const modalElement = document.getElementById("pedidoModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal.hide();
    },
    guardarPedido() {
      if (this.modo === "crear") {
        axios
          .post("http://localhost:8000/api/pedidos", this.form)
          .then(() => {
            this.cargarPedidos();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error("Error al guardar pedido:", error);
          });
      } else {
        axios
          .put(`http://localhost:8000/api/pedidos/${this.form.id}`, this.form)
          .then(() => {
            this.cargarPedidos();
            this.cerrarModal();
          })
          .catch((error) => {
            console.error("Error al editar pedido:", error);
          });
      }
    },
    eliminarPedido(id) {
      if (confirm("¿Estás seguro de eliminar este pedido?")) {
        axios
          .delete(`http://localhost:8000/api/pedidos/${id}`)
          .then(() => {
            this.cargarPedidos();
          })
          .catch((error) => {
            console.error("Error al eliminar pedido:", error);
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
.container {
  max-width: 1000px;
}
</style>
