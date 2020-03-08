import React, { Component } from "react";
import "./NewDebt.scss";
import FormField from "../../ui/FormField.jsx";
import DebtServices from "../../../services/debt.services";
import Button from "../../ui/Button"

export default class NewDebt extends Component {
  constructor() {
    super();
    this.service = new DebtServices();
  }
  state = {
    name: "",
    entity: "",
    category: "",
    interestRate: 0,
    remaining: 0,
    minMonthlyPayment: 0
  };

handleChange=(e,field) => {
this.setState({
...this.state,
[field]: e.target.value

})
}

handleSubmit =event => {
  event.preventDefault();
  this.service.postDebt(this.props.loggedInUser._id, this.state)
  .then(e => console.log(e));
}

  render() {
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
