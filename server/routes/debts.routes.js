const express = require('express')
const router = express.Router()
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
        .then(allDebts => res.json(allDebts[0].debts))
        .catch(err => console.log(err))

})
//might not be necessary
// router.get('/getOneDebt/:id', (req, res, next) => {
//     Debt.findById(req.params.id)
//         .then(theDebt => res.json(theDebt))
//         .catch(err => console.log(err))
// })

router.post('/:id/new', (req, res) => {
    Debt.create(req.body)
        .then(theDebt => {
            User.findByIdAndUpdate(req.params.id, {
                    $push: {
                        debts: theDebt._id
                    }
                })
                .then(() => res.json(theDebt))
        })
        .catch(err => console.log(err))
})

router.delete(`/:userId/delete/:id`, (req, res) => {
    Debt.findByIdAndDelete(req.params.id)
        .then(() => {
            User.findByIdAndUpdate(req.params.userId, {
                    $pull: {
                        debts: req.params.id
                    }
                })
                .then(() => res.send("deleted"))
        })
})



module.exports = router