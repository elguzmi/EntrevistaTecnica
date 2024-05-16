<script setup lang="ts">
import TabMenu from 'primevue/tabmenu'
import { ref } from 'vue'
import { routerLinks } from '@/router/list-routes.ts'
import { RouterLink } from 'vue-router'
const items = ref(routerLinks)
</script>

<template>
  <TabMenu
    :model="items"
    :pt="{
      root: { class: 'w-full bg-color_blue rounded-md' },
      menu: { class: 'flex flex-row' },
      menuitem: { class: 'px-2 text-lg font-bold' }
    }"
  >
    <template #item="{ item }">
      <RouterLink :to="item.path">{{ item.title }} </RouterLink>
    </template>
  </TabMenu>
</template>

<style lang="scss" scoped>
.router-link-active {
  color: #f8bf1e;
}
</style>
