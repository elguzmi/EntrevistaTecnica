<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import CardNew from '@/news/components/CardNew.vue'
import { getNewsByCtaegory } from '../helpers/getNewsPopular'
import { type Ref, ref } from 'vue'
import type { Article } from '../interfaces'

// import { getNews } from '../helpers/getNewsPopular'
const route = useRoute()
const router = useRouter()
const ListNews: Ref<Article[]> = ref([])
let categoryProp: Ref<string> = ref('')
const isloading: Ref<boolean> = ref(false)

router.afterEach((to) => {
  const { category } = to.params
  console.log(category)
  if (categoryProp.value != category.toString()) {
    categoryProp.value = category.toString()
    searchForNews(categoryProp.value)
  }
  //console.log('Route properties changed:', to.params)
  // Handle the property changes as needed
})

const searchForNews = async (category: string) => {
  try {
    isloading.value = true
    const news = await getNewsByCtaegory(category)
    console.log(news)
    ListNews.value = news
  } catch (error) {
    console.error('Error fetching news:', error)
    alert('Error de red favor intentar nuevamente mas tarde')
  } finally {
    isloading.value = false
  }
}
if (route.params.category) {
  categoryProp.value = route.params.category.toString()
  searchForNews(categoryProp.value)
}
</script>

<template>
  <div v-show="isloading">
    <ProgressSpinner class="w-full" />
  </div>
  <div class="card flex justify-content-center px-10" v-show="!isloading">
    <div class="">
      <!-- <label for="Select">Selecciona el numero de noticias</label>
      <TreeSelect
        v-model="selectedValue"
        :options="itemOptions"
        placeholder="Numero de noticias"
        class="md:w-20rem w-full"
        @update:modelValue="changeValueOption"
      /> -->
    </div>
  </div>
  <div class="main p-10 flex flex-wrap justify-around" v-if="ListNews.length > 0">
    <CardNew
      class="rounded-md mb-4 mr-4 max-w-80"
      v-for="({ author, content, urlToImage, title }, index) of ListNews"
      :key="index"
      :author="author || undefined"
      :content="content?.substring(1, 150) + '...'"
      :imgUrl="urlToImage || undefined"
      :title="title"
    ></CardNew>
  </div>
</template>

<style lang="scss" scoped></style>
