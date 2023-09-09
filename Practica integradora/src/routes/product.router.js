const { Router } = require('express')
const { productModel } = require('../models/product.model')

const router = Router()

router.get('/', async (req, res) => {
    try {
        let products = await productModel.find()
        res.send({ result: "success", payload: products })
    } catch (error) {
        console.error(error)
        res.status(500).send({ result: "error", message: "Error al obtener los productos" })
    }
})


router.post('/', async (req, res) => {
    let products = req.body;
  
    try {
      let result = await productModel.create(products)
      res.send({ result: "success", payload: result })
    } catch (error) {
      console.error(error)
      res.status(500).send({ result: "error", message: "Error al crear el producto" })
    }
  });
  
router.put('/:pid', async (req, res) => {
    let { pid } = req.params
    let productToReplace = req.body
    if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.stock) {
        res.send({ status: "error", error: "Missing body params" })
    } else {
        try {
            let result = await productModel.updateOne({ _id: pid }, productToReplace)
            res.send({ result: "success", payload: { product: result } });
        } catch (error) {
            console.error(error)
            res.status(500).send({ result: "error", message: "Error al actualizar el producto" })
        }
    }
})


router.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    try {
        let result = await productModel.deleteOne({ _id: pid })
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error(error)
        res.status(500).send({ result: "error", message: "Error al eliminar el producto" })
    }
})


module.exports = router