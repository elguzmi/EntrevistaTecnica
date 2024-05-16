<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/shared/components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>

<style lang="scss">
body {
  padding: 10px;
}
</style>
