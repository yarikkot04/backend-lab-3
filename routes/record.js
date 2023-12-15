const { Router } = require('express')
const router = Router()
const Record = require('../model/record_model')

router.get('/add', (req, res) => {
    res.render('record-post', {
        title: 'Add record'
    })
})

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId
        const categoryId = req.query.categoryId
        if (userId && categoryId) {
            const selectedRecords = await Record.filterByAllParams(userId, categoryId)
            res.json({ selectedRecords, status: 'a' })
        } else if (userId && !categoryId) {
            const selectedRecords = await Record.filterByUserId(userId)
            res.json({ selectedRecords, status: 'u' })
        } else if (!userId && categoryId) {
            const selectedRecords = await Record.filterByCategoryId(categoryId)
            res.json({ selectedRecords, status: 'c' })
        } else if (!userId && !categoryId) {
            const selectedRecords = []
            res.json({ selectedRecords, error: 'Enter search parameters!' })
        }
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.post('/', async (req, res) => {
    try {
        const newRecord = new Record(req.body)
        const savedRecord = await newRecord.save()
        if (savedRecord.status !== 1) {
            res.json(savedRecord.saved)
        } else {
            res.status(404).json({ error: savedRecord.error })
        }
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.get('/:id', async (req, res) => {
    try {
        const selectedRecord = await Record.findById(req.params.id)
        if (selectedRecord.status !== 1) {
            res.json(selectedRecord)
        } else {
            res.status(404).json({ error: selectedRecord.error })
        }
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const records = await Record.removeRecordById(req.params.id)
        res.json(records)
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

module.exports = router