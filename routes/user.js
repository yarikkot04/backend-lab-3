const { Router } = require('express')
const router = Router()
const User = require('../model/user_model')
const { CommonUtils } = require('../utils/CommonUtils')


router.get('/', (req, res) => {
    res.render('user-post', {
        title: 'Add user'
    })
})

router.post('/', async (req, res) => {
    try {
        let { name, default_currency } = req.body
        const userStatus = await CommonUtils.checkUsernameByNameNotExists(name)
        if (!userStatus) {
            res.status(404).json({ error: 'User with this name already exist!' })
            return
        }
        if (default_currency === undefined) default_currency = 'UAH'
        if (CommonUtils.checkCurrencyValidity(default_currency)) {
            const newUser = new User({
                name,
                default_currency,
            })
            const savedUser = await newUser.save()
            res.json(savedUser)
        } else {
            res.status(404).json({ error: 'Incorrect currency type!' })
        }
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: 'The user with this id does not exist' })
            return
        }
        res.json(user)
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(404).json({ error: 'The user with this id does not exist' })
            return
        }
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const userExistenceStatus = await CommonUtils.verifyUserExistenceById(req.params.id)
        if(!userExistenceStatus) {
            res.status(404).json({ error: 'The user with this id does not exist' })
            return
        }
        const id = req.params.id
        await User.findByIdAndDelete(id)
        const users = await User.find()
        res.json({ users, status: 0 })
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(404).json({ error: 'The user with this id does not exist', status: 1 })
            return
        }
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

module.exports = router
