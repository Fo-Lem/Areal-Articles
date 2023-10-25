<script>
import Comment from '@components/comment.vue'
import { createComment, getComments, removeComment } from '@controllers/commentsController.js'
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
  data() {
    return {
      comments: [],
    }
  },
  async beforeMount() {
    await this.fetchComment()
  },

  methods: {
    async fetchComment() {
      this.comments = await getComments(this.article.id)
      this.comments.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    async createComm(value) {
      if (await createComment(this.article.id, value.body))
        await this.fetchComment()
    },
    async remove(commentId) {
      if (await removeComment(this.article.id, commentId))
        await this.fetchComment()
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
      @deleteComment="(commentId) => { remove(commentId) }"
      @updateComment="fetchComment()"
    />
    <FormComment :key="comments.length > 0 ? comments[comments.length - 1].id : 1" @createComment="(body) => { createComm(body) }" />
  </div>
</template>

<style>

</style>
