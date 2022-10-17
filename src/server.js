import express from "express"
import morgan from "morgan"
import cors from 'cors'
import bodyParser from "body-parser"
import { PORT } from "./config.js"
import product from "./product.js"
import user from "./user.js"
import admin from './admin.js'

const server = express()

server.use(morgan('combined'))
server.use(cors())
server.use(bodyParser.json())

server.use('/product', product)
server.use('/user', user)
server.use('/admin', admin)

server.listen(PORT, function () {
  console.log(`Aplikasi aktif pada port: ${PORT}`)
})