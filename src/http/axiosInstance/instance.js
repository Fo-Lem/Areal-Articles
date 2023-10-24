import axios from 'axios'

const $user = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export {
  $user,
}
