const express = require('express')

const User = require('../models/user.js')
const auth = require('../middlewares/auth.js')

const router = new express.Router()


// Create User
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
})

//Login User
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(500).send()
    }
})

//Logout User
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('Logged Out')
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get User by id
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