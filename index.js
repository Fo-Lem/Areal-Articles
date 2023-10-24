import process from 'node:process'
import express from 'express'
import cors from 'cors'
import { bd } from './bd.js'
import { articlesRouter } from './routes/articlesRoutes.js'
import { commentsRouter } from './routes/commentsRoutes.js'

const app = express()
const PORT = process.env.PORT || 8081

app.use(cors())
app.use(express.json())

app.use('/', articlesRouter)
app.use('/', commentsRouter)

async function start() {
  try {
    await bd.authenticate()
    await bd.sync()
    app.listen(PORT, () => {
      return console.log(`server started on port ${PORT}`)
    })
  }
  catch (error) {
    console.log(error)
  }
}

start()
