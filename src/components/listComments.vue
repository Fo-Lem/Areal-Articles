<script>
import Comment from '@components/comment.vue'
import FormComment from '@components/formComment.vue'

export default {
  name: 'ListComments',
  components: {
    Comment, FormComment,
  },
  props: {
    article: {
      requared: true,
      type: Object,
    },
  },
  computed: {
    comments() {
      return this.$store.getters.allComments
    },
  },
  async beforeMount() {
    this.$store.dispatch('fetchComments', this.$route.params.articleId)
  },

  methods: {
    async createComment(value) {
      this.$store.dispatch('createComment', [this.article.id, value.body])
    },
  },

}
</script>

<template>
  <div v-if="comments" class="flex flex-col gap-5 p-2  ">
    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :article="article"
      @deleteComment="(commentId) => { removeComment(commentId) }"
    />
    <FormComment :key="comments.length > 0 ? comments[comments.length - 1].id : 1" :article="article" @createComment="(body) => { createComment(body) }" />
  </div>
</template>

<style>

</style>
