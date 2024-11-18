const Author = require('../models/Author.js')
const Book = require('../models/Book.js')

const createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body
        const author = await Author.create({ name: name, bio: bio })
        await author.save()
        res.status(201).json({ success: true, data: author })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'internal server error' })
    }
}

const createBook = async (req, res) => {
    try {
        const { title, author } = req.body
        const book = await Book.create({ title: title, author: author })
        await book.save()
        res.status(201).json({ success: true, data: book })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'internal server error' })
    }
}

const getBookWithAuthor = async (req, res) => {
    try {
        const id = req.params.id
        const book = await Book.findById(id).populate('author')
        if(!book){
            return res.status(404).json({message: 'book not found'})
        }
        res.status(200).json({ success: true, data: book})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports = { createAuthor, createBook, getBookWithAuthor }