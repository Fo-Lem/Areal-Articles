import { $user } from '../http/axiosInstance/instance.js'

async function getComments(articleId) {
  return await $user.get(`/article/${articleId}/comments/`).then((res) => {
    return res.data.rows
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}

async function getComment(articleId, commentid) {
  return await $user.get(`/article/${articleId}/comment/${commentid}/`).then((res) => {
    return res
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}
async function getCommentsByPeriod(from, to) {
  to = to.split('-')
  to[2] = Number(to[2]) + 1
  to = to.join('-')
  return await $user.get('/analytic/comments/',
    { params: { dateFrom: from, dateTo: to } }).then((res) => {
    return res.data
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}

async function patchComment(articleId, commentid, body) {
  return await $user.patch(`/article/${articleId}/comment/${commentid}/`, { body }).then((res) => {
    return res
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}
async function createComment(articleId, body) {
  return await $user.post(`/article/${articleId}/comment/`, { body }).then((res) => {
    return res.data
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}
async function removeComment(articleId, commentid) {
  return await $user.delete(`/article/${articleId}/comment/${commentid}/`).then((res) => {
    return res
  }).catch((error) => {
    console.error(error)
    return undefined
  })
}
export {
  getComments,
  getComment,
  patchComment,
  createComment,
  removeComment,
  getCommentsByPeriod,
}
