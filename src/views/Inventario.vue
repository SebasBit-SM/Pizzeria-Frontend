<template>
    <div class="container">
      <h1 class="my-4">Gestión de Inventario</h1>
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Material</th>
            <th>Unidad</th>
            <th>Stock Actual</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="material in materiales" :key="material.id">
            <td>{{ material.id }}</td>
            <td>{{ material.nombre }}</td>
            <td>{{ material.unidad }}</td>
            <td>{{ material.stock_actual }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        materiales: [] // Lista para almacenar los materiales del inventario
      };
    },
    mounted() {
      // Petición al API para cargar los materiales
      axios.get('http://localhost:8000/api/inventario')
        .then(response => {
          this.materiales = response.data; // Guarda los datos en la lista
        })
        .catch(error => {
          console.error('Error al cargar el inventario:', error);
        });
    }
  };
  </script>
  
  <style>
  /* Opcional: estilo para la tabla */
  .table-bordered {
    margin-top: 20px;
  }
  </style>
  