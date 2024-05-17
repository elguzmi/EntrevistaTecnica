<script setup lang="ts">
import FooterBar from '@/shared/components/FooterBar.vue'
import { RouterView, useRouter, type Router } from 'vue-router'
import NavBar from '@/shared/components/NavBar.vue'
import { routerLinks } from '@/news/router/list-routes'

const router: Router = useRouter()

const sessionActive: string = sessionStorage.key(0) || ''
if (sessionActive == '') {
  router.push({ name: 'login' })
}
</script>

<template>
  <header>
    <NavBar :routerLinks="routerLinks" :mainMenu="true" />
  </header>
  <RouterView />
  <FooterBar></FooterBar>
</template>

<style lang="scss"></style>
