<script>
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  name: 'FormArticle',
  components: {
    ErrorMessage, Field, Form,
  },
  props: {
    article: {
      type: Object,
    },
  },

  data() {
    return {
      title: '',
      body: '',
      validateSchema: toTypedSchema(
        zod.object({
          title: zod.string()
            .min(1, { message: 'Поле пустое' }),
          body: zod.string()
            .min(1, { message: 'Поле пустое' }),
        }),
      ),

    }
  },
  beforeMount() {
    if (this.article) {
      this.title = this.article.title
      this.body = this.article.body
    }
  },
  methods: {
    create(values) {
      console.log(values)
    },
    reset() {
      if (this.article) {
        this.title = this.article.title
        this.body = this.article.body
      }
    },

  },
}
</script>

<template>
  <Form :validation-schema="validateSchema" @submit="create" @reset="reset">
    <div class="flex flex-col gap-y-5 p-5">
      <div class="">
        <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Заголовок</label>

        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <Field id="title" v-model="title" type="text" name="title" required class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
        </div>
        <ErrorMessage class="text-red-500" name="title" />
      </div>

      <div class="col-span-full">
        <label for="body" class="block text-sm font-medium leading-6 text-gray-900">Содержание</label>
        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <Field id="body" v-model="body" as="textarea" name="body" rows="3" required class="block flex-1 border-0 bg-transparent min-h-fit py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
        </div>
        <ErrorMessage class="text-red-500" name="body" />
      </div>

      <div class="flex items-center justify-end gap-x-5">
        <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </div>
  </Form>
</template>

<style>

</style>
