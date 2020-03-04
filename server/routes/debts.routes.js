const express = require('express')
const router = express.Router()
// const data = require('../db/db.json')
const Debt = require('../models/Debt.model')
const User = require('../models/User.model')

router.get('/:id/getAllDebts', (req, res, next) => {
    User.find({
            _id: req.params.id
        })
        .populate({
            path: 'debts',
            model: 'Debt'
        })
        .then(allDebts => res.json(allDebts))
        .catch(err => console.log(err))
    // res.json(allDebts)
})
//might not be necessary
router.get('/getOneDebt/:id', (req, res, next) => {
    Debt.findById(req.params.id)
        .then(theDebt => res.json(theDebt))
        .catch(err => console.log(err))
})

router.post('/:id/new', (req, res, next) => {
    console.log(req.body)
    Debt.create(req.body)
        .then(theDebt => res.json(theDebt))
        .catch(err => console.log(err))
})



module.exports = router