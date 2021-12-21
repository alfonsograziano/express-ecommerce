const Category = require("../models/category.model")
const Product = require("../models/product.model")


const addCategory = (req, res) => {
    //Here i don't make input validation for two reasons
    //1) This is a protected route, so just trusted users can use it
    //2) Here i just create something on the database, in case it will fail and i'll get an error message :) 
    const category = new Category({
        name: req.body.name,
        description: req.body.description
    })

    category.save()
        .then(doc => res.json(doc))
        .catch(err => res.status(422).json(err))
}


const getCategories = (req, res) => {
    Category.find({})
        .then(doc => res.json(doc))
        .catch(err => res.status(422).json(err))
}


const updateCategory = (req, res) => {

}

const deleteCategory = (req, res) => {
    //TODO: Delete in cascade all the references to this category
}


module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
}