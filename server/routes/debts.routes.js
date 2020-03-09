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
    console.log("req.body");
    console.log(req.body);
    Debt.create(req.body)
        .then(theDebt => {
            User.findByIdAndUpdate(req.params.id, {
                    $push: {
                        debts: theDebt._id
                    }
                })
                .then(() => res.json(theDebt))
        })
        .then(() => res.json({
            deleted: "true"
        }))
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    Debt.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(theDebt => res.json(theDebt))
        .catch(err => console.log(err))

})

router.delete(`/:userId/delete/:id`, (req, res) => {
    Debt.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log("deleting....")
            User.findByIdAndUpdate(req.params.userId, {
                    $pull: {
                        debts: req.params.id
                    }
                })
                .then(() => res.json({
                    deleted: true
                }))
        })
        .then(() => {
            console.log("succesfully deleted.")
            res.json({
                deleted: true
            })
        })
})



module.exports = router