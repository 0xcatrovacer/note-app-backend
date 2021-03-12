const express = require('express')

const User = require('../models/user.js')

const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id);
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router