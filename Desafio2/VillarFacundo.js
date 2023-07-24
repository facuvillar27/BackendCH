const fs = require("fs")

class Contenedor {
    constructor(file) {
        this.file = file
    }

    async save(obj) {
        try{
            const objects = await this.getAllObjects()
            const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0
            const newId = lastId + 1
            const newObj = { id: newId, ...obj }
            objects.push(newObj)
            await this.saveObjects(objects)
            return newId
        }catch(error) {
            throw new Error("Error al guardar el objeto")
        }
    }
    async getById(id) {
        try{
            const objects = await this.getAllObjects()
            const object = objects.find((obj) => obj.id === id)
            return object || null
        }catch(error) {
            throw new Error("Error al obtener el Id")
        }
    }
    
    async getAll() {
        try{
            const objects = await this.getAllObjects()
            return objects
        }catch(error) {
            throw new Error("Error al obtener los objetos")
        }
    }

    async deleteById(id) {
        try{
            let objects = await this.getAllObjects()
            objects = objects.filter((obj) => obj.id !== id)
            await this.saveObjects(objects)
        }catch(error){
            throw new Error("Error al eliminar el objeto")
        }
    }

    async deleteAll(){
        try{
            await this.saveObjects([])
        }catch(error){
            throw new Error("Error al eliminar los objetos")
        }
    }

    async getAllObjects(){
        try{
            const data = await fs.promises.readFile(this.file, "utf-8")
            return data ? JSON.parse(data) : []
        }catch(error){
            return []
        }
    }

    async saveObjects(objects) {
        try{
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
        }catch(error){
            throw new Error("Error al guardar objetos")
        }
    }
}

const main = async () => {
    const productos = new Contenedor("productos.txt")

    // Guardar un objeto

    const id = await productos.save(
        { title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"}
    )
    console.log("Objeto guardado con ID:", id)

    
    // Obtener todos los objetos

    const allObjects = await productos.getAll()
    console.log("Objetos guardados", allObjects)

    // Eliminar un objeto

    await productos.deleteById(1)
    console.log("Objeto eliminado")

    // Obtener objeto por ID

    await productos.getById(2)
    console.log("Objeto obtenio")
}

main().catch((error) => console.error(error))

