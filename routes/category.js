const { Router } = require('express')
const router = Router()
const Category = require('../model/category_model')

router.get('/add', (req, res) => {
    res.render('category-post', {
        title: 'Add category'
    })
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.getAll()
        res.json(categories)
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})


router.post('/', async (req, res) => {
    try {
        const newCategory = new Category(req.body.name)
        const savedCategory = await newCategory.save()
        if(savedCategory.status !== 1) {
            res.json(savedCategory.saved)
        } else {
            res.status(404).json({ error : savedCategory.error})
        }
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.delete('/', async (req, res) => {
    try {
        const categories = await Category.removeCategoryByName(req.query.categoryName)
        res.json(categories)
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

module.exports = router