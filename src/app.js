const express = require("express")
const app = express()

const fruitRouter = require("../routes/fruits")
const userRouter = require("../routes/users")

app.use("/fruits", fruitRouter)
app.use("/users", userRouter)

module.exports = app;