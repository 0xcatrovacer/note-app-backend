const express = require('express')

const Note = require('../models/note.js')

const router = new express.Router()

router.post('/notes', async (req, res) => {
    const note = new Note({
        ...req.body
    })
    try {
        await note.save()
        res.status(201).send(note)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/notes', async (req, res) => {
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

module.exports = router