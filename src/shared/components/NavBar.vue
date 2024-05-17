<script setup lang="ts">
import TabMenu from 'primevue/tabmenu'
import { ref } from 'vue'
// import { routerLinks } from '@/router/list-routes.ts'
import { RouterLink } from 'vue-router'
import type { RouterLinks } from '@/shared/interfaces/routerLinks.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
interface Props {
  routerLinks?: RouterLinks[]
  mainMenu?: boolean
  position?: string
}

const props = withDefaults(defineProps<Props>(), {
  mainMenu: false
})

const items = ref(props.routerLinks)
const closeSesion = () => {
  sessionStorage.clear()
  router.push('/')
}
</script>

<template>
  <Nav
    class="bg-white dark:bg-gray-900 w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div v-if="mainMenu">
      <h1 class="text-3xl font-bold text-center py-5 text-white">Santiago News</h1>
      <button
        @click="closeSesion"
        class="bg-color_yellow hover:bg-color_yellow text-white font-bold py-2 px-4 rounded absolute top-5 right-0"
      >
        <span class="material-icons">logout</span>
      </button>
    </div>
    <TabMenu
      :model="items"
      :ink="false"
      :pt="{
        root: {
          class:
            'w-full bg-color_blue py-2 bg-white dark:bg-gray-900  w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600'
        },
        menu: { class: 'flex flex-row justify-center dark:bg-gray-900 text-white' },
        menuitem: { class: 'px-2 text-lg font-bold ' },
        inkbar: { class: 'd-none' }
      }"
    >
      <template #item="{ item }">
        <RouterLink :to="item.path">{{ item.title }} </RouterLink>
      </template>
    </TabMenu>
  </Nav>
</template>

<style lang="scss" scoped>
.router-link-active {
  color: #f8bf1e;
}
</style>
