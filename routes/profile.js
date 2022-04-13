const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// Getting All
router.get('/', async(req, res) => {
    try {
        const profile = await User.find()
        res.json(profile)
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getProfile, (req, res) => {
    res.json(res.profile)
})

// Creating One
router.post('/', async(req, res) => {
    const profile = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        nationality: req.body.nationality
    })

    try {
        const newProfile = await profile.save()
        res.status(201).json(newProfile)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update One
router.patch('/', getProfile, async(req, res) => {
    if (req.body.name != null) {
        res.profile.name = req.body.name
    }
    if (req.body.email != null) {
        res.profile.email = req.body.email
    }
    try {
        const updateProfile = await res.profile.save()
        res.json(updateProfile)
    } catch (error) {
        res.status(300).json({ message: error.message })
    }
})

// Delete One
router.delete('/:id', getProfile, async(req, res) => {
    try {
        await res.profile.remove()
        res.json({ message: "Deleted Profile" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getProfile(req, res, next) {
    let profile
    try {
        profile = await profile.findById(req.params.id)
        if (profile == null) {
            return res.status(404).json({ message: `Cannot find profile` })
        }
    } catch (error) {
        return res.status(400).json({ message: err.message })
    }
    res.profile = profile
    next()
}
module.exports = router