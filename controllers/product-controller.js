const Product = require('../models/Product.js')

const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: 'AMD Ryzen',
                category: 'CPU',
                price: 499,
                inStock: true,
                tags: ['fast', 'awesome']
            },
            {
                name: 'Intel Core',
                category: 'CPU',
                price: 449,
                inStock: true,
                tags: ['fast', 'flex']
            },
            {
                name: 'Samsung',
                category: 'Smartphone',
                price: 999,
                inStock: true,
                tags: ['many features', 'software upgrade guaranted']
            },
            {
                name: 'Asus TUF',
                category: 'Laptop',
                price: 1299,
                inStock: false,
                tags: ['laptop', 'gaming']
            },
            {
                name: 'Nvidia',
                category: 'VGA',
                price: 2999,
                inStock: false,
                tags: ['powerfull', 'great vga']
            }
        ]

        const result = await Product.insertMany(sampleProducts)
        res.status(201).json({ success: true, data: result })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'internal server error' })
    }
}

const getProductStats = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    inStock: true,
                    price: { $gte: 100 }
                }
            },
            {
                $group: {
                    _id: '$category',
                    avgPrice: { $avg: '$price' },
                    count: { $sum: 1 }
                }
            }
        ])
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ success: false, message: 'internal server error' })
    }
}

const getProductAnalysist = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$price' },
                    averagePrice: { $avg: '$price' },
                    maxProductPrice: { $max: '$price' },
                    minProuctPrice: { $min: '$price' }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalRevenue: 1,
                    avgeragePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    priceRange: { $subtract: ['$maxProductPrice', '$minProductPrice'] }
                }
            }
        ])
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ success: false, message: 'internal server error' })
    }
}

module.exports = { insertSampleProducts, getProductStats, getProductAnalysist }