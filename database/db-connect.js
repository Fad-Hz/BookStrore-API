const mongoose = require('mongoose')

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database terkoneksi')
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = conn