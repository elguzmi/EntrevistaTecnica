<script setup lang="ts">
import { getNews } from '../helpers/getNewsPopular'
import NavBar from '@/shared/components/NavBar.vue'
import { routerLinksCategory } from '@/news/router/list-routes'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <NavBar :router-links="routerLinksCategory" position="relative"></NavBar>
  <RouterView />
</template>

<style lang="scss" scoped></style>
