const { Router } = require('express')
const router = Router()
const Record = require('../model/record_model')
const User = require('../model/user_model')
const { CommonUtils } = require('../utils/CommonUtils')

router.get('/add', (req, res) => {
    res.render('record-post', {
        title: 'Add record'
    })
})

router.get('/', async (req, res) => {
    try {
        const user_id = req.query.userId
        const category_id = req.query.categoryId
        if (user_id && category_id) {
            let selectedRecords
            try {
                selectedRecords = await Record.find({ user_id, category_id })
            } catch (e) {
                selectedRecords = []
            }
            res.json({ selectedRecords, status: 'a' })
        } else if (user_id && !category_id) {
            let selectedRecords
            try {
                selectedRecords = await Record.find({ user_id })
            } catch (e) {
                selectedRecords = []
            }
            res.json({ selectedRecords, status: 'u' })
        } else if (!user_id && category_id) {
            let selectedRecords
            try {
                selectedRecords = await Record.find({ category_id })
            } catch (e) {
                selectedRecords = []
            }
            res.json({ selectedRecords, status: 'c' })
        } else if (!user_id && !category_id) {
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
        let {
            user_id,
            category_id,
            amount,
            currency
        } = req.body
        const userExistenceStatus = await CommonUtils.verifyUserExistenceById(user_id)
        const categoryExistenceStatus = await CommonUtils.verifyCategoryExistenceById(category_id)
        if (!userExistenceStatus) {
            res.status(404).json({ error: 'The user with this id does not exist' })
        } else if (!categoryExistenceStatus) {
            res.status(404).json({ error: 'The category with this id does not exist' })
        } else {
            if (!currency) {
                const user = await User.findById(user_id)
                currency = user.default_currency
            }
            if (!CommonUtils.checkAmountValidity(amount) || !CommonUtils.checkCurrencyValidity(currency)) {
                res.status(404).json({ error: 'Incorrect currency or amount input format' })
            }
            const newRecord = new Record({
                user_id, category_id, amount, currency
            })
            await newRecord.save()
            res.json(newRecord)
        }
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.get('/:id', async (req, res) => {
    try {
        const selectedRecord = await Record.findById(req.params.id)
        if (!selectedRecord) {
            res.status(404).json({ error: 'The record with this id does not exist' })
            return
        }
        res.json(selectedRecord)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(404).json({ error: 'The record with this id does not exist' })
            return
        }
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const recordExistenceStatus = await CommonUtils.verifyRecordExistenceById(req.params.id)
        if (!recordExistenceStatus) {
            res.status(404).json({ error: 'The record with this id does not exist', status: 1 })
            return
        }
        await Record.findByIdAndDelete(req.params.id)
        const records = await Record.find()
        res.json(records)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(404).json({ error: 'The record with this id does not exist', status: 1 })
            return
        }
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

module.exports = router