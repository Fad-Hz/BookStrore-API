const express = require('express')
const { insertSampleProducts, getProductStats, getProductAnalysist } = require('../controllers/product-controller')
const route = express.Router()

route.post('/add', insertSampleProducts)
route.get('/get', getProductStats)
route.get('/analysist', getProductAnalysist)

module.exports = route