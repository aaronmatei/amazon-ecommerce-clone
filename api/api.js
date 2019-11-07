const router = require('express').Router()
const async = require('async')
const faker = require('faker')
const Category = require('../models/category')
const Product = require('../models/product')

router.post('/search', (req, res, next) => {

    Product.search({
        query_string: {
            query: req.body.search_item
        }
    }, (err, results) => {
        if (err) 
            return next(err)


        


        res.json(results)
    })
})


router.get('/:name', (req, res, next) => {
    async.waterfall([
        (callback) => {
            Category.findOne({
                name: req.params.name
            }, (err, category) => {
                if (err) 
                    return next(err)


                


                callback(null, category)

            })

        },
        (category, callback) => {
            for (let i = 0; i < 30; i++) {
                const product = new Product()
                product.category = category._id
                product.name = faker.commerce.productName()
                product.price = faker.commerce.price()
                product.image = faker.image.image()

                product.save()
            }
        }
    ])
    res.json({message: 'Success'})
})
module.exports = router
