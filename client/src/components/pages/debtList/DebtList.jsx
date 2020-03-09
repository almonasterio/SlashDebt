import React, { Component } from "react";

import DebtServices from "../../../services/debt.services";

import DebtCard from "./DebtCard.jsx";
import TotalDebtCard from "./TotalDebtCard.jsx";
import Card from "react-bootstrap/Card";
import { InputGroup, FormControl } from "react-bootstrap";
import { Redirect } from "react-router";
import "./DebtList.scss";

class DebtList extends Component {
  state = {
    debts: [],
    // loggedInUser: null,
    totalMinMonthlyPayment: 0,
    totalDebt: 0
  };
  constructor() {
    super();
    this.service = new DebtServices();
  }

  mounted() {
    this.service.getAllDebts(this.props.loggedInUser._id).then(debts => {

      let totalDebt = 0;
      let totalMinMonthlyPayment = 0;

      debts.forEach(debt => {
        totalDebt += debt.remaining;
        totalMinMonthlyPayment += debt.minMonthlyPayment;
      });

      this.setState(
        {
          ...this.state,
          debts,
          totalDebt,
          totalMinMonthlyPayment,
        },
        () => {}
      );
    });
  }
  componentDidMount() {
    this.mounted();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.loggedInUser._id && this.props.loggedInUser._id) {
      this.mounted();
    }
  }

  handleRemove = (userId, debtId) => {
    this.service.deleteDebt(userId,debtId)
    .then(()=>this.mounted())
  }

  render() {
    const {
      totalDebt,
      totalMinMonthlyPayment,
    } = this.state;
  
   
    return (
      // {this.props.loggedInUser && <Redirect to="/login" />}

      <div className="dashboard-container">
        <div id="debt-cards-container">
          {totalDebt ? (
            <TotalDebtCard
              totalDebt={totalDebt}
              className="card-total"
              color="danger"
              text="TOTAL MONTHLY PAYMENTS"
              totalMinMonthlyPayment={totalMinMonthlyPayment}
            />
          ) : (
            <TotalDebtCard
              totalDebt={totalDebt}
              className="card-total"
              color="success"
              text="YOU ARE DEBT FREE"
            />
          )}
          <a href="/new">
            <Card className="add-debt-button" bg="primary" text="black">
              <h3>ADD DEBT</h3>
            </Card>
          </a>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Append>
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          {this.state.debts.map(debt => (
            <DebtCard
              key={debt._id}
              userID={this.props.loggedInUser._id}
              {...debt}
              deleteButton={this.handleRemove}
           ></DebtCard>
            //Meter Link
          ))}
       
          
        </div>
      </div>
    );
  }
}

export default DebtList;
