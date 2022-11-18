const express = require ('express')
const app = express()
const Contenedor = require ("./container/container.js")
const producto = new Contenedor()

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
/*         const { producto } = req.body
        const { id } = req.params 
    
        const productoModificar = productos[parseInt(id)]
    
        productos[id] = producto*/
    
        res.json({msg: "modificar productos por id"})
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


