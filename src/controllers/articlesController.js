import { $user } from '../http/axiosInstance/instance.js'

async function getArticles() {
  return await $user.get('/articles/').then((res) => {
    return res.data.rows
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}

async function getArticle(id) {
  return await $user.get(`/article/${id}/`).then((res) => {
    return res.data
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}

async function patchArticle(id, title, body) {
  return await $user.patch(`/article/${id}`, { title, body }).then((res) => {
    return res
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}
async function createArticle(title, body) {
  return await $user.post('/article/', { title, body }).then((res) => {
    return res
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}
async function removeArticle(id) {
  return await $user.delete(`/article/${id}`).then((res) => {
    return res
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}
export {
  getArticles,
  getArticle,
  patchArticle,
  createArticle,
  removeArticle,
}
