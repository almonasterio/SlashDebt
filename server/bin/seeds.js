// Seeds file that remove all users and create 2 new users and
// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Debt = require("../models/Debt.model");
const bcryptSalt = 10;

mongoose
  .connect(`${process.env.MONGODB_LOCAL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error("Error connecting to mongo", err)
  });

let users = [{
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),

  }
]

debts = [{
    name: "Amazon Visa",
    entity: "Chase Bank",
    category: "Credit Card",
    interestRate: 20,
    remaining: 2000,
    minMonthlyPayment: 120,
    history: [{
        year: 2018,
        amount: {
          "January": 1500,
          "February": 1500,
          "March": 1400,
          "April": 1200,
          "May": 1200,
          "June": 1100,
          "July": 1400,
          "August": 1300,
          "September": 1100,
          "October": 1100,
          "November": 900,
          "December": 700
        }
      },
      {
        year: 2019,
        amount: {
          "January": 500,
          "February": 500,
          "March": 400,
          "April": 200,
          "May": 200,
          "June": 170,
          "July": 400,
          "August": 300,
          "September": 200,
          "October": 400,
          "November": 900,
          "December": 700
        }
        //  estimatedEndDate: Date,

        //  interestMonthly: Number, Array?
        //  principalMonthly: Number,
        //  totalPaid: Number,
        //  totalInterestPaid: Number,
      }
    ]
  },
  {
    name: "American Express",
    entity: "American Express",
    category: "Credit Card",
    interestRate: 22,
    remaining: 3000,
    minMonthlyPayment: 200,
    history: [{
        year: 2018,
        amount: {
          "January": 2500,
          "February": 2500,
          "March": 2400,
          "April": 2200,
          "May": 2200,
          "June": 2200,
          "July": 2400,
          "August": 2300,
          "September": 2200,
          "October": 2100,
          "November": 1900,
          "December": 1700
        }
      },
      {
        year: 2019,
        amount: {
          "January": 1500,
          "February": 1500,
          "March": 1400,
          "April": 1200,
          "May": 1200,
          "June": 800,
          "July": 400,
          "August": 300,
          "September": 200,
          "October": 400,
          "November": 900,
          "December": 700
        }
      }
    ]
  },
  {
    name: "Hospital",
    entity: "Tucson Hospital",
    category: "Healthcare",
    interestRate: 12,
    remaining: 6000,
    minMonthlyPayment: 500,
    history: [{
        year: 2018,
        amount: {
          "January": 2500,
          "February": 2500,
          "March": 2400,
          "April": 2200,
          "May": 2200,
          "June": 2200,
          "July": 2400,
          "August": 2300,
          "September": 2200,
          "October": 2100,
          "November": 1900,
          "December": 1700
        }
      },
      {
        year: 2019,
        amount: {
          "January": 1500,
          "February": 1500,
          "March": 1400,
          "April": 1200,
          "May": 1200,
          "June": 800,
          "July": 400,
          "August": 300,
          "September": 200,
          "October": 400,
          "November": 900,
          "December": 700
        }
      }
    ]
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    return Debt.deleteMany()
  })
  .then(() => {
    return Debt.create(debts)
  })
  .then(debtsCreated => {
    User.find()
      .then(usersFound => {
        usersFound.forEach((user, idx) => User.findByIdAndUpdate(user._id, {
            $push: {
              debts: debtsCreated[idx]
            }
          })
          .then(() => console.log("succesfull connection between debt and user")))
      })
    console.log(`${debtsCreated.length} debts created with the following id:`);
    console.log(debtsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    // mongoose.disconnect()
  })
  .catch(err => {
    // mongoose.disconnect()
    // throw err
  })