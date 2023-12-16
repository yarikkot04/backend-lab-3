const { Router } = require('express')
const router = Router()
const Record = require('../model/record_model')

router.get('/', async (req,res) => {
    try {
        const records = await Record.find()
        res.json(records)
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

module.exports = router