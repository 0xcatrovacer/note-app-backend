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
        res.status(200).send({ user, token })
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

// Get User Details
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//Delete User
router.delete('/users/delete', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router