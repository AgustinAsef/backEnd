//esto es servidor
const express = require ('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//motor de plantilla
app.set('view engine', 'ejs')
app.set('views', './views')

//ruta raiz
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//config de puerto
const PORT = 8090

// array de productos
productos = [
    {name:"Remera",
    price: 1200,
    thumbnail:"https/",
    id:1},
    {name:"Pantalon",
    price: 2100,
    thumbnail:"https/",
    id:2}
]

mensajes = [
    {
      autor:'Juan',
      fecha:'hoy',
      hora: 'mensaje preguardado',
      mensaje:'la vaca, mu'
    },
    {
        autor:'Pedro',
        fecha:'hoy',
        hora: 'mensaje preguardado',
        mensaje:'la misma vaca, mu'
    }
]


//Middleware
function mdl1(req, res, next) {
    console.log(req.query.rol)
    if (req.query.rol !== "admin") {
        res.status(500).send("Usuario no autorizado")
    }
    next()
}

io.on('connection', socket => {
    console.log('nuevo cliente conectado')

    socket.emit('mensajes', mensajes)

    socket.on('mensaje', data =>{

        console.log(data,' ', 'log de la data recibida')
        mensajes.push(data)
        io.sockets.emit('mensajes', mensajes)
    })    
})

//ruta de productos y metodos
app.get('/productos', (req, res)=>{
    res.render('main', {productos}) 
})
    
app.get('/productos/:id', (req, res)=>{
    let {id} = req.params
    let obj = productos.find(obj => obj.id === parseInt(id))
    res.json(obj)
    if (!obj) {
        console.log("no se encontro el producto");
        }else{
        res.json(obj)
    } 
})

app.post('/productos', (req, res)=>{
    let { name, price, thumbnail } = req.body 
    let id
    if (productos.length == 0) {
        id = 1
    }else{
        id = productos.length +1
    }
    let articulo ={ name : name, price : price, thumbnail : thumbnail} 
    const newProduct = {...articulo, id}
    productos.push(newProduct)
    res.redirect('/productos')
    })
    
app.put('/productos/:id', (req, res)=>{
    let { name, price, thumbnail } = req.body
    let { id } = req.params
    id = parseInt(id)
    let producto = { name : name, price : price, thumbnail : thumbnail}
    let obj = productos.find(obj => obj.id === parseInt(id))
    let index = productos.indexOf(obj)

        if (!obj) {
            console.log("no se encontro el producto");
            res.json({msg: "no se encontro el producto"})
            }else{
                productos[index] = {...producto, id}
                res.json({msg: "producto modificado con exito"})
        }
        
    })
    
app.delete('/productos/:id', (req, res)=>{
    let {id} = req.params
    const obj = productos.filter (obj => obj.id !== parseInt(id)) 
            if (!obj) {
                return null
            }
            productos.push(obj)
    res.json({msg: "se borro el producto correctamente"})
    })
        
const server = httpServer.listen(PORT, ()=>{
    console.log('esta vivoooo!!')
})

server.on("error", error => console.log("error al crear el servidor"))