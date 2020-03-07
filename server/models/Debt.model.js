const mongoose = require('mongoose')
const Schema = mongoose.Schema
const debtSchema = new Schema({
    name: String,
    entity: String,
    category: {
         type: String,
         enum: ['Credit Card', 'Car', 'Bank Loan', 'Student Loan', 'Healthcare', 'Retail']
     },
    interestRate: Number,
    remaining: Number,

    minMonthlyPayment: Number,
    estimatedEndDate: Date,

    interestMonthly: Number,
    principalMonthly: Number,
    totalPaid: Number,
    totalInterestPaid: Number,
    

    isPaid: {
        type: Boolean,
        default: false
    },
    history: [{
        year: Number,
        amount: Object,       
    }]
}, {
    timestamps: true
})

const debtModel = mongoose.model('Debt', debtSchema)
module.exports = debtModel