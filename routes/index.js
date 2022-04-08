const server = require('express').Router()
const Product = require('../controllers/products.controller')
server.post('/products/create' , Product.insert )
server.get('/products' , Product.getAll)
server.get('/products/:id' , Product.getOne)
server.patch('/products/update'  , Product.updateOneBYName)
server.delete('/products/delete'  , Product.delete)
module.exports = server