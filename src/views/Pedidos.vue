<template>
    <div class="container">
      <h1 class="my-4">Gestión de Pedidos</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Tipo de Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.id">
            <td>{{ pedido.id }}</td>
            <td>{{ pedido.cliente }}</td>
            <td>{{ pedido.estado }}</td>
            <td>{{ pedido.total | formatoMoneda }}</td>
            <td>{{ pedido.tipoEntrega }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>