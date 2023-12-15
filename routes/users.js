const { Router } = require('express')
const User = require('../model/user_model')
const router = Router()

router.get('/', async (req, res) => {
    const users = await User.getAll()
    res.json(users)
})

module.exports = router