<script setup lang="ts">
import { getNews } from '../helpers/getNewsPopular.ts'

getNews().then((e) => console.log(e))
</script>

<template>
  <div>Noticias Nuevas</div>
  <section class="w-1/2 bg-blue_main">ss</section>
  <Card>
    <template #header>
      <img alt="user header" src="" />
    </template>
    <template #title>Advanced Card</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!
      </p>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped></style>
