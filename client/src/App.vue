<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <section class="page">
    <RouterView />
  </section>
</template>

<style scoped>
  .page{
    width: 100%;
    height: 100vh;
    /* background-color: #2B2B2B; */
    background-color: #101010;
    color: #fefefe;
  }
</style>
