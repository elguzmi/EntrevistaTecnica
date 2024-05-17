<script lang="ts">
import CardNew from '@/news/components/CardNew.vue'
import { getTopNews } from '../helpers/getNewsPopular'
import type { Article } from '@/news/interfaces/newsResponse.ts'
import ProgressSpinner from 'primevue/progressspinner'
import { ref, type Ref } from 'vue'

export default {
  components: { CardNew, ProgressSpinner },
  data() {
    const topNews: Ref<Article[]> = ref([])
    const selectedValue: any = ref('10')
    const itemOptions: { key: string; label: string }[] = [
      {
        key: '10',
        label: '10'
      },
      {
        key: '20',
        label: '20'
      },
      {
        key: '30',
        label: '30'
      }
    ]
    const isloading: Ref<boolean> = ref(true)
    return {
      topNews,
      selectedValue,
      itemOptions,
      isloading
    }
  },
  mounted() {
    this.searchForNews(this.selectedValue)
  },
  methods: {
    changeValueOption(e: Object) {
      const selectedNumber: number = Number(Object.keys(e)[0] || 10)
      this.searchForNews(selectedNumber)
    },
    async searchForNews(top: number) {
      try {
        this.isloading = true
        const data: Article[] = await getTopNews(top)
        this.topNews = data
        this.isloading = false
      } catch (error) {
        console.log(error)
        alert('Error de red, favor intentar mas tarde')
      }
    }
  }
}
</script>

<template>
  <div v-show="isloading">
    <ProgressSpinner class="w-full" />
  </div>
  <div class="card flex justify-content-center px-10" v-show="!isloading">
    <div class="">
      <label for="Select">Selecciona el numero de noticias</label>
      <TreeSelect
        v-model="selectedValue"
        :options="itemOptions"
        placeholder="Numero de noticias"
        class="md:w-20rem w-full"
        @update:modelValue="changeValueOption"
      />
    </div>
  </div>
  <div class="main p-10 flex flex-wrap justify-around">
    <CardNew
      v-show="urlToImage != null"
      class="rounded-md mb-4 mr-4 max-w-80"
      v-for="({ author, content, urlToImage, title }, index) of topNews"
      :key="index"
      :author="author || undefined"
      :content="content.substring(1, 150) + '...'"
      :imgUrl="urlToImage || undefined"
      :title="title"
    ></CardNew>
  </div>
</template>

<style lang="scss" scoped></style>
