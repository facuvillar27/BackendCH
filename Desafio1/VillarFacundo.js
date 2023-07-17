class ProductManager {
    constructor(products) {
        this.products = []
        this.nextId = 1
    }

    addProduct (product) {
        if(!this.isProductValid(product)) {
            console.log("Error: El producto no es válido")
            return
        }
        if (this.isCodeDuplicate(product.code)) {
            console.log("Error: El código del producto ya está siendo utilizado")
            return
        }

        product.id = this.nextId++
        this.products.push(product)
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {
        const product = this.products.find((p) => p.id === id)
        if(product) {
            return product
        } else {
            console.log("Error: Producto no encontrado")
        }
    }

    isProductValid(product){
        return(
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code) {
        return this.products.some((p) => p.code === code)
    }
}

const productManager = new ProductManager()

productManager.addProduct({
    title: "Calzado",
    description: "Calzado Deportivo",
    price: 1000,
    thumbnail: "/CalzadoDeportivo.jpg",
    code: "C001",
    stock: 10
})

productManager.addProduct({
    title: "Remera",
    description: "Remera roja con estampado",
    price: 1700,
    thumbnail: "/remeraRojaConEstampado.jpg",
    code: "R001",
    stock: 30
})

const productsList = productManager.getProducts()

console.log(productsList)

const productId = productManager.getProductsById(2)

console.log(productId)

const noPorduct = productManager.getProductsById(20)