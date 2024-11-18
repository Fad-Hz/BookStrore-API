const express = require('express')
const route = express.Router()

const { createAuthor, createBook, getBookWithAuthor } = require('../controllers/book-controller.js')

route.post('/author', createAuthor)
route.post('/book', createBook)
route.get('/book/:id', getBookWithAuthor)

module.exports = route