import React, { Component } from "react";

import DebtServices from "../../../services/debt.services";

// import { Doughnut } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";

class DebtList extends Component {
  state = {
    debts: []
  };

  // componentDidMount() {
  //   this.setState({
  //     debts: this.debtServices.getAllDebts(this.props.loggedInUser.id)

  //   });
  // }
  render() {
    const { userInSession } = this.props;
    const debts = userInSession;

    if (userInSession) console.log(this.state.debts);
    return (
      <>
        <div>Hola estas son todas tus deudas</div>
        {/* <Doughnut data={data}></Doughnut>
        <Line data={data2}></Line> */}
      </>
    );
  }
}

export default DebtList;
