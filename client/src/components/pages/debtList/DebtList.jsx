import React, { Component } from "react";

import DebtServices from "../../../services/debt.services";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import DebtCard from "./DebtCard.jsx";
import "./DebtList.scss";

class DebtList extends Component {
  state = {
    debts: [],
    loggedInUser: null,
    doughnutDebts: [],
    doughnutDebtsLabels: [],
    lineDebts: [],
    lineDebtsLabels: []
  };

  constructor() {
    super();
    this.service = new DebtServices();
  }

  componentDidMount() {
    this.service.getAllDebts(this.props.loggedInUser._id).then(debts => {
      let doughnutDebts = [];
      let doughnutDebtsLabels = [];

      let finalDates = {};
      debts.forEach((debt, idx) => {
        debt.history.forEach((year, idx) => {
          let monthsCollection = year.amount;
          let theYear = year.year;
          Object.keys(monthsCollection).forEach((month, idx) => {
            let finalMonth = month + year.year;
            let finalAmount = finalDates[finalMonth];
            let euros = monthsCollection[month];
            finalAmount
              ? (finalDates[finalMonth] = +finalDates[finalMonth] + euros)
              : (finalDates[finalMonth] = "0");
          });
        });
      });

      debts.forEach(debt => {
        doughnutDebts.push(debt.remaining);
        doughnutDebtsLabels.push(debt.name);
      });
      this.setState(
        {
          ...this.state,
          debts,
          doughnutDebts,
          doughnutDebtsLabels,
          lineDebts: Object.values(finalDates),
          lineDebtsLabels: Object.keys(finalDates)
        },
        () => {
          console.log(this.state.lineDebtsLabels);
        }
      );
    });
  }

  render() {
    console.log(this.state.doughnutDebts);
    const {
      lineDebtsLabels,
      doughnutDebtsLabels,
      lineDebts,
      doughnutDebts
    } = this.state;

    const dataLine = {
      labels: lineDebtsLabels,
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: lineDebts
        }
      ]
    };

    const dataChartDoughnut = {
      labels: doughnutDebtsLabels,
      datasets: [
        {
          data: doughnutDebts,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#009018",
            "#00c5ff"
          ],
          hoverBackgroundColor: [
            "#d4395a",
            "#3791ce",
            "#dbaa31",
            "#18872a",
            "#0ca5d2"
          ]
        }
      ]
    };
    return (
      <div className="dashboard-container">
        <div className="container-charts">
          <div>Hola estas son todas tus deudas</div>;
          <Doughnut data={dataChartDoughnut}></Doughnut>
          <Line data={dataLine}></Line>
        </div>
        <div id="debt-cards-container">
          {this.state.debts.map(debt => (
            <DebtCard key={debt._id} {...debt} />
          ))}
        </div>
      </div>
    );
  }
}

export default DebtList;
