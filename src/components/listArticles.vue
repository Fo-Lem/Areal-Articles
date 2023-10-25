<script>
import FormArticle from '@components/formArticle.vue'

export default {
  name: 'ListComments',
  components: {
    FormArticle,
  },
  computed: {
    articles() {
      return this.$store.getters.allArticles
    },
  },
  async beforeMount() {
    this.$store.dispatch('fetchArticles')
  },

}
</script>

<template>
  <div class="flex flex-col gap-5 ">
    <div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="">
          <tr>
            <th class="text-start">
              {{ articles.length > 0 ? 'Список статей' : 'Список статей пуст' }}
            </th>
          </tr>
        </thead>
        <tbody v-if="articles.length > 0">
          <tr v-for="article in articles" :key="article.id" class="hover:bg-gray-100 cursor-pointer">
            <td>
              <router-link :to="{ name: 'article', params: { articleId: article.id } }">
                {{ article.title }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormArticle :key="articles[articles.length - 1]?.id" @createArticle="(body) => { createArticle(body) }" />
  </div>
</template>

<style>

</style>
