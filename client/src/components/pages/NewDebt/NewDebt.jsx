import React, { Component } from "react";
import "./NewDebt.scss";
import FormField from "../../ui/FormField.jsx";
import DebtServices from "../../../services/debt.services";
import Button from "../../ui/Button";
import SelectField from "../../ui/SelectField.jsx";

import { Redirect } from "react-router";

export default class NewDebt extends Component {
  constructor() {
    super();
    this.service = new DebtServices();
  }
  state = {
    name: "",
    entity: "",
    category: "Credit Card",
    interestRate: 0,
    remaining: 0,
    minMonthlyPayment: 0,
categories: ['Credit Card', 'Car', 'Bank Loan', 'Student Loan', 'Healthcare','Retail'],
    redirect: false
  };

  handleChange = (e, field) => {
    this.setState({
      ...this.state,
      [field]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.service.postDebt(this.props.loggedInUser._id, this.state).then(e => {
      this.setState({
        redirect: true
      });
      console.log(e);
    });
  };

  render() {
    const { redirect, categories } = this.state;
    console.log(categories)

    if (redirect) {
      return <Redirect to="/allDebts" />;
    }
    return (
      <div className="form-container">
        <div className="form-width">
          <FormField
            label="Name debt"
            name="name"
            type="text"
            placeholder="Debt Name"
            inputChange={e => this.handleChange(e, "name")}
          />
          <FormField
            label="Entity"
            name="entity"
            type="text"
            placeholder="Entity"
            inputChange={e => this.handleChange(e, "entity")}
          />
          <SelectField
            label="Category"
            name="category"
            categories={[
              "Credit Card",
              "Car",
              "Bank Loan",
              "Student Loan",
              "Healthcare",
              "Retail"
            ]}
            inputChange={e => this.handleChange(e, "category")}
          />
          <FormField
            label="Interest Rate %"
            name="interest"
            type="number"
            placeholder="APR"
            inputChange={e => this.handleChange(e, "interestRate")}
          />
          <FormField
            label="Debt Amount"
            name="remaining"
            type="number"
            placeholder="$"
            inputChange={e => this.handleChange(e, "remaining")}
          />
          <FormField
            label="Minimum Payment"
            name="minMonthlyPayment"
            type="number"
            placeholder="$"
            inputChange={e => this.handleChange(e, "minMonthlyPayment")}
          />
          <Button
            submit={e => this.handleSubmit(e)}
            className=""
            info="Submit"
          />
        </div>
      </div>
    );
  }
}
