import React, { Component } from "react";
import DebtServices from "../../../services/debt.services";

class DebtList extends Component {
  state = {
    debts: [],
    loggedInUser: null
  };

  constructor() {
    super();

    this.service = new DebtServices();
  }

  componentDidMount() {
    this.service.getAllDebts(this.props.loggedInUser._id).then(debts => {
      console.log(debts);
      this.setState({
        ...this.state,
        debts
      });
    });
  }

  render() {
    // console.log(this.props.debts);
    return (
      <div>
        <div>Hola estas son todas tus deudas</div>;
        {this.state.debts.map((debt, idx) => (
          <span key={idx}>{debt.interestRate}</span>
        ))}
      </div>
    );
  }
}

export default DebtList;
