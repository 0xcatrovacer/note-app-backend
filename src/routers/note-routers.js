const express = require('express')

const Note = require('../models/note.js')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/notes', auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id
    })
    try {
        await note.save()
        res.status(201).send(note)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/notes', auth, async (req, res) => {
    try {
        const note = await Note.find()

        if (!note) {
            return res.status(404).send()
        }
        res.send(note)

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/notes/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id })

        if (!note) {
            return res.status(404).send()
        }
        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router