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