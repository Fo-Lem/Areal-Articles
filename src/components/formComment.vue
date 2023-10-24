<script>
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  name: 'FormComment',
  components: {
    ErrorMessage, Field, Form,
  },
  props: {
    comment: {
      type: Object,
    },
  },
  emits: ['reset', 'createComment', 'updateComment'],

  data() {
    return {
      body: '',
      validateSchema: toTypedSchema(
        zod.object({
          body: zod.string()
            .min(1, { message: 'Поле ввода не должно быть пустым' }),
        }),
      ),

    }
  },
  beforeMount() {
    if (this.comment)
      this.body = this.comment.body
  },
  methods: {
    createComment(values) {
      if (this.comment)
        this.$emit('updateComment', values)

      else this.$emit('createComment', values)
    },

    resetComment() {
      if (this.comment)
        this.$emit('reset')
    },

  },
}
</script>

<template>
  <Form :validation-schema="validateSchema" @submit="createComment" @reset="resetComment">
    <div class="flex flex-col gap-y-5">
      <div class="col-span-full">
        <label for="body" class="block text-sm font-medium leading-6 text-gray-900">Ваш комментарий</label>
        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <Field id="body" v-model="body" as="textarea" name="body" required class="block text-base flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6" />
        </div>
        <ErrorMessage class="text-red-500" name="body" />
      </div>

      <div class="flex items-center justify-end gap-x-5">
        <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">
          Отмена
        </button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {{ comment ? 'Изменить' : 'Создать' }}
        </button>
      </div>
    </div>
  </Form>
</template>

<style>

</style>
