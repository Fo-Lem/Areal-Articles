import express from 'express'
import cors from 'cors'
import sequelize from './db'

const app = express()
const PORT = import.meta.env.PORT || 8081

// const routerUser = require("./routes/User.routes");
// const routerMessage = require("./routes/Message.routes");
// const routerWs = require("./routes/Ws.routes");
// const routerRooms = require("./routes/Rooms.routes");
// const errorHandler = require("./middleware/ErrorHandlingMiddleware");

app.use(cors())
app.use(express.json())

// app.use("/api", routerWs);
// app.use("/api", routerUser);
// app.use("/api", routerMessage);
// app.use("/api", routerRooms);

// //Обработка ошибок
// app.use(errorHandler)
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
