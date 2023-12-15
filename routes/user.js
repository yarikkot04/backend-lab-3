const { Router } = require('express')
const router = Router()
const User = require('../model/user_model')

router.get('/', (req, res) => {
    res.render('user-post', {
        title: 'Add user'
    })
})

router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body.name)
        const savedUser = await newUser.save()
        res.json(savedUser)
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
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const selectedUser = await User.findById(id)
        if (!selectedUser) {
            res.status(404).json({ error: 'The user with this id does not exist', status: 1 })
            return
        }
        const users = await User.removeUser(id)
        res.json({ users, status: 0 })
    } catch (e) {
        res.status(404).json({ error: 'Server error!' })
        return
    }
})

module.exports = router
