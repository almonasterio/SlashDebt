const express = require('express')
const router = express.Router()

const Coaster = require('../models/Coaster.model')

router.get('/getAllCoasters', (req, res, next) => {
  Coaster.find()
    .then(allCoasters => res.json(allCoasters))
    .catch(err => console.log(err))
})

router.get('/getOneCoaster/:id', (req, res, next) => {
  Coaster.findById(req.params.id)
    .then(theCoaster => res.json(theCoaster))
    .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
  Coaster.create(req.body)
    .then(theCoaster => res.json(theCoaster))
    .catch(err => console.log(err))
})



module.exports = router