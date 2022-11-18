const fs = require(`fs`).promises

productos = [
    {name:"Remera",
    price: 1200,
    thumbnail:"https/",
    id:0},
    {name:"Pantalon",
    price: 2100,
    thumbnail:"https/",
    id:1}
]

class Contenedor{
    constructor (path){
        this.path = path
    }
    
    getAll(req, res){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            const obj = data.find (obj => obj.id === id)

            if (!obj) {
                return null
            }else{
               return obj
            }              

        } catch (error) {
            console.log(error)
        }
    }

    async save(obj){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            let id
            if (data.length == 0) {
                id = 1
            }else{
                id = data.length +1
            }
            const newProduct = {...obj, id}
            data.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return newProduct.id

        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await fs.writeFile(this.path, JSON.stringify([]), "utf-8")
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            const obj = data.filter (obj => obj.id !== id) 
            
            if (!obj) {
                return null
            }
            data.push(obj)
            await fs.writeFile(this.path, JSON.stringify(obj, null, 2), "utf-8")
            return obj         

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor