const { Router } = require('express')
const router = Router()

router.get('/user', (req, res) => {
    res.render('user-find', {
        title: 'Find user'
    })
})

router.post('/user', (req, res) => {
    res.redirect(`/user/${req.body.id}`)
})

router.get('/record', (req, res) => {
    res.render('record-find', {
        title: 'Find record'
    })
})

router.post('/record', (req, res) => {
    res.redirect(`/record/${req.body.id}`)
})

router.get('/filter/record', (req, res) => {
    res.render('filter-record', {
        title: 'Filter record'
    })
})
router.get('/filter/userId/error', (req, res) => {
    res.status(404).json({ error: 'Record with this userId doesn`t exist!' })
})
router.get('/filter/categoryId/error', (req, res) => {
    res.status(404).json({ error: 'Record with this categoryId doesn`t exist!' })
})
router.get('/filter/error', (req, res) => {
    res.status(404).json({ error: 'Record with this userId and categoryId doesn`t exist!' })
})

router.get('/filter/noParams/error', (req, res) => {
    res.status(404).json({ error: 'Enter search parameters!' })
})

module.exports = router