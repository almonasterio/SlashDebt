import React, { Component } from 'react';
import DebtServices from "../../../services/debt.services";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Redirect } from "react-router";
import "./DebtsSummary.scss";

class DebtsSummary extends Component {
state = {
    debts: [],
    loggedInUser: null,
    doughnutDebts: [],
    doughnutDebtsLabels: [],
    lineDebts: [],
    lineDebtsLabels: [],
    totalMinMonthlyPayment: 0,
    totalDebt: 0
  };

  constructor() {
    super();
    this.service = new DebtServices();
  }

  mounted() {
    this.service.getAllDebts(this.props.loggedInUser._id).then(debts => {
      let doughnutDebts = [];
      let doughnutDebtsLabels = [];
      let totalDebt = 0;
      let totalMinMonthlyPayment = 0;

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
        totalDebt += debt.remaining;
        totalMinMonthlyPayment += debt.minMonthlyPayment;
        doughnutDebts.push(debt.remaining);
        doughnutDebtsLabels.push(debt.name);
      });

      this.setState(
        {
          ...this.state,
          debts,
          doughnutDebts,
          doughnutDebtsLabels,
          totalDebt,
          totalMinMonthlyPayment,
          lineDebts: Object.values(finalDates),
          lineDebtsLabels: Object.keys(finalDates)
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

  render() {
    const {
      totalDebt,
      totalMinMonthlyPayment,
      lineDebtsLabels,
      doughnutDebtsLabels,
      lineDebts,
      doughnutDebts
    } = this.state;
    console.log(totalDebt);

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
          <div>
            <h1>All DEBTS</h1>
            <div className="container-charts">
              <div className="top-chart">
                <Doughnut
                  className="div-doughnut"
                  data={dataChartDoughnut}
                ></Doughnut>
              </div>

              <div className="bottom-chart">
                <Line data={dataLine}></Line>
              </div>
            </div>
          </div>
        );
    }
}

export default DebtsSummary;