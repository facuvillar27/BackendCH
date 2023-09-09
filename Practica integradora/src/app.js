const express = require('express')
const mongoose = require('mongoose')
const cartRouter = require('./routes/cart.router')
const { cartModel } = require('./models/cart.model')
const { productModel } = require('./models/product.model')
const productRouter = require('./routes/product.router')
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json())
const environment = () => {
    mongoose.connect('mongodb+srv://facuvillar27:admin@cluster0.pmdpmvu.mongodb.net/ecommerce')
    .then(() => {
        console.log("Conectado a la BD de Mongo Atlas")
    })
    .catch(error => {
        console.error("Error en la conexión", error)
    })
}

environment()

app.use("/api/cart", cartRouter)
app.use("/api/product", productRouter)

