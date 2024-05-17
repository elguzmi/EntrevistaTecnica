<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  imgUrl?: string
  title?: string
  author?: string
  content?: string
}

withDefaults(defineProps<Props>(), {
  imgUrl: '',
  title: 'testing',
  author: undefined,
  content: 'holi'
})
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img alt="user header" :src="$props.imgUrl" />
    </template>
    <template #title>{{ $props.title }}</template>
    <template #subtitle>{{ $props.author }}</template>
    <template #content>
      <p class="m-0">
        {{ $props.content }}
      </p>
    </template>
    <!-- <template #footer>
      <div class="flex gap-3 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template> -->
  </Card>
</template>

<style lang="scss" scoped></style>
