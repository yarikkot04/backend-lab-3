const { Router } = require('express')
const router = Router()
const Category = require('../model/category_model')
const { CommonUtils } = require('../utils/CommonUtils')

router.get('/add', (req, res) => {
    res.render('category-post', {
        title: 'Add category'
    })
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.post('/', async (req, res) => {
    try {
        const { name } = req.body
        const categoryStatus = await CommonUtils.checkCategoryByNameNotExists(name)
        if (!categoryStatus) {
            res.status(404).json({ error: 'Category with this name already exist!' })
            return
        }
        const newCategory = new Category({
            name
        })
        await newCategory.save()
        res.json(newCategory)
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.delete('/', async (req, res) => {
    try {
        const categoryStatus = await CommonUtils.checkCategoryByNameNotExists(req.query.categoryName)
        if (categoryStatus) {
            res.status(404).json({ error: 'The category with this id does not exist!' })
            return
        }
        await Category.findOneAndDelete({ name: req.query.categoryName })
        const categories = await Category.find()
        res.json(categories)
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

module.exports = router