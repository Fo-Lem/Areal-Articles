<script>
import ListComments from '@components/listComments.vue'
import FormArticle from '@components/formArticle.vue'
import { router } from '../router/router.js'
import { getArticle, patchArticle, removeArticle } from '../controllers/articlesController'

export default {
  name: 'Comment',
  components: {
    ListComments, FormArticle,
  },
  emits: ['updateArticle', 'deleteArticle'],
  data() {
    return {
      article: {},
      isUpdate: false,
    }
  },
  async beforeMount() {
    this.article = await getArticle(this.$route.params.articleId)
  },
  methods: {
    async updateArticle(values) {
      await patchArticle(this.article.id, values.title, values.body).then(() => {
        this.isUpdate = false
      })
      if (!this.isUpdate)
        this.article = await getArticle(this.$route.params.articleId)
    },
    async deleteArticle() {
      if (await removeArticle(this.article.id))
        router.go(-1)
    },

  },

}
</script>

<template>
  <div class="">
    <router-link :to="{ name: 'listArticles' }">
      Назад
    </router-link>

    <div v-if="article.title && !isUpdate" class="flex flex-col justify-between rounded-md shadow-sm ring-1 p-2 ring-inset ring-gray-300 ">
      <div class="flex flex-row justify-between p-2 gap-2">
        <h2 class="text-lg">
          {{ article.title }}
        </h2>
        <div class="flex gap-2 flex-row">
          <button class="h-5 w-5" @click="isUpdate = true">
            <svg class=" stroke-orange-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          <button class="h-5 w-5" @click="deleteArticle">
            <svg class=" stroke-red-600 fill-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="p-2">
        <p class=" text-justify">
          {{ article.body }}
        </p>
        <div class=" text-sm mt-5 text-gray-500">
          <p>Дата создания : {{ article.createdAt.split('T')[0] }} {{ article.createdAt.split('T')[1].split('.')[0] }}</p>
        </div>
      </div>

      <ListComments :article="article" />
    </div>
    <FormArticle
      v-else :article="article"
      @reset="(isUpdate = false)"
      @updateArticle="(values) => { updateArticle(values) }"
    />
  </div>
</template>

<style>

</style>
