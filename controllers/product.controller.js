const Product = require("../models/product.model")
const { validationResult } = require('express-validator')


const add = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })

    const product = await newProduct.save()
    if (!product) return res.status(401).json("Error")

    res.json(product)

}


const get = (req, res) => {

    const filter = req.body.filter || {}
    Product.find(filter)
        .populate("categories")
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err))
}


const getByCategory = (req, res) => {

    const categoryId = req.body.categoryId
    Product.find({ categories: categoryId })
        .populate("categories")
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err))
}

const deleteProduct = async (req, res) => {
    const ids = req.body.ids

    const result = await Product.updateMany({ _id: ids, }, { deleted: true })
    res.json(result)
}

const update = async (req, res) => {
    const id = req.body.id
    const updates = req.body.updates

    const result = await Product.findOneAndUpdate({ _id: id }, updates)
    res.json(result)
}

const updateCategories = async (req, res) => {
    const id = req.body.id
    const categories = req.body.categories

    if(!Array.isArray(categories)) return res.status(422).json("You should pass an array of categories")

    //TODO: Add check if all categories are valid

    Product.findOneAndUpdate({ _id: id}, {
        categories: categories
    })
    .then(doc => res.json(`Categories updated for ${doc.name}`))
    .catch(err => res.status(422).json(err))
}

module.exports = {
    add,
    deleteProduct,
    update,
    get,
    getByCategory,
    updateCategories
}