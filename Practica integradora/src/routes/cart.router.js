const { Router } = require('express')
const { cartModel } = require('../models/cart.model')
const { productModel } = require('../models/product.model')

const router = Router()

router.get('/', async (req, res) => {
    try {
      const products = await productModel.find()
      const cart = products.map(product => ({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock
      }));
  
      const existingCart = await cartModel.findOne()
  
      if (existingCart) {
        await cartModel.replaceOne({ _id: existingCart._id }, { products: cart })
      } else {
        const cartInstance = new cartModel({ products: cart })
        await cartInstance.save()
      }
  
      res.send({ result: "success", payload: cart })
    } catch (error) {
      console.error(error)
      res.status(500).send({ result: "error", message: "Error al obtener datos del carrito" })
    }
  })

  router.delete('/:cid', async (req, res) => {
    let { cid } = req.params;
    try {
        let result = await cartModel.deleteOne({ _id: cid })
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error(error)
        res.status(500).send({ result: "error", message: "Error al eliminar el producto" })
    }
})
  
  module.exports = router;