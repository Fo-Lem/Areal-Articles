<script>
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  name: 'CommentsByPeriod',
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  data() {
    return {
      period: {
        from: new Date(2023, 0, 1, 3).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
      },

    }
  },
  computed: {
    commentsGroupByArticle() {
      return this.$store.getters.commentsByPeriod
    },
  },
  async beforeMount() {
    await this.getComments()
  },
  methods: {
    async getComments() {
      await this.$store.dispatch('fetchCommentsByPeriod', [this.period.from, this.period.to])
    },
  },

}
</script>

<template>
  <div class="flex flex-col gap-5">
    <Form @submit="getComments">
      <div class="flex flex-col gap-y-5">
        <div class="">
          <label for="from" class="block text-sm font-medium leading-6 text-gray-900">Дата начала</label>
          <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <Field id="from" v-model="period.from" type="date" name="from" required class="block text-base flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6" />
          </div>
          <ErrorMessage class="text-red-500" name="from" />
        </div>
        <div class="">
          <label for="to" class="block text-sm font-medium leading-6 text-gray-900">Дата конца</label>
          <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <Field id="to" v-model="period.to" type="date" name="to" required class="block text-base flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6" />
          </div>
          <ErrorMessage class="text-red-500" name="to" />
        </div>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Поиск
        </button>
      </div>
    </Form>
    <div v-if="commentsGroupByArticle.length > 0" class="flex flex-col gap-5">
      <div v-for="article in commentsGroupByArticle" :key="article.id" class="flex flex-col gap-2">
        <router-link :to="`/article_${article.id}`">
          {{ article.title }}
        </router-link>
        <p class="text-sm">
          Дата создания : {{ article.createdAt.split('T')[0] }} {{ article.createdAt.split('T')[1].split('.')[0] }}
        </p>
        <div v-for="comment in article.comments" :key="comment.id" class="ml-5">
          <p>{{ comment.body }}</p>
          <p class="text-sm">
            Дата создания : {{ comment.createdAt.split('T')[0] }} {{ article.createdAt.split('T')[1].split('.')[0] }}
          </p>
        </div>
        <hr>
      </div>
    </div>
    <div v-else>
      <p>Список пуст</p>
    </div>
  </div>
</template>

<style>

</style>
