import express from 'express'
import cors from 'cors'
import sequelize from './db'

import { articleRouters } from './routes/articlesRoutes.js'
import { commentsRouter } from './routes/commentsRoutes'

const app = express()
const PORT = import.meta.env.PORT || 8081

app.use(cors())
app.use(express.json())

app.use('/', articleRouters)
app.use('/', commentsRouter)

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      return console.log(`server started on port ${PORT}`)
    })
  }
  catch (error) {
    console.log(error)
  }
}

start()
