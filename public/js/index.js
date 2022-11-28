const express = require ('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))

io.on('connetciom', socket => {
    console.log('nuevo cliente conectado')
})