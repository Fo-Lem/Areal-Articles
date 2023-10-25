<script>
export default {
  name: 'App',

}
</script>

<template>
  <header class="flex items-center justify-between p-5 pb-0">
    <router-link class=" text-slate-600 hover:underline " :to="{ name: 'listArticles' }">
      Список статей
    </router-link>
    <router-link class=" text-slate-600 hover:underline" :to="{ name: 'commentsByPeriod' }">
      Список коментариев по дате
    </router-link>
  </header>
  <div class="p-5 m-auto">
    <router-view />
  </div>
</template>

<style scoped>
.router-link-exact-active {
  font-weight: 700;
}
</style>
