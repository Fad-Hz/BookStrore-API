require('dotenv').config()
const conn = require('./database/db-connect.js')
conn()

const express = require('express')
const app = express()
app.use(express.json())

const productRoutes = require('./routes/product-route.js')
const bookRoute = require('./routes/book-route.js')
app.use('/products', productRoutes)
app.use('/reference', bookRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))