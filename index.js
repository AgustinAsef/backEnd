const express = require ('express')
const app = express()
const Contenedor = require ("./container/container.js")
const producto = new Contenedor()

app.use('/api', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 8090

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

app.get('/api/productos', (req, res)=>{
    res.send({Productos: productos}) 
})
    
app.get('/api/productos/:id', (req, res)=>{
    let {id} = req.params
    let obj = productos.find(obj => obj.id === parseInt(id))
    res.json(obj)
    if (!obj) {
        console.log("no se encontro el producto");
        }else{
        res.json(obj)
    } 
})

app.post('/api/productos/post', (req, res)=>{
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
    res.send({status: "se agregó el articulo correctamente"})
    })
    
app.put('/api/productos/:id', (req, res)=>{
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
    
app.delete('/api/productos/:id', (req, res)=>{
    
    let {id} = req.params
    const obj = productos.filter (obj => obj.id !== parseInt(id)) 
            if (!obj) {
                return null
            }
            productos.push(obj)
    res.json({msg: "se borro el producto correctamente"})
    })
        
const server = app.listen(PORT, ()=>{
    console.log('esta vivoooo!!')
})

server.on("error", error => console.log("error al crear el servidor"))

