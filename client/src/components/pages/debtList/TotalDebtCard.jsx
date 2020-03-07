import React, { Component } from 'react'
import Card from "react-bootstrap/Card";
import "./TotalDebtCard.scss";

const TotalDebtCard =({totalDebt, totalMinMonthlyPayment,color,text }) => {
    return (
      <Card className="card-total" bg={color} text="white">
        <Card.Header className="card-header">
          <h3>TOTAL DEBT</h3>
          <h2>${totalDebt}</h2>
        </Card.Header>
        <Card.Text className="card-text">
          <h5>{text}</h5>
          {totalMinMonthlyPayment && <h5>$ {totalMinMonthlyPayment}</h5>}
        </Card.Text>
      </Card>
    );
    }

    export default TotalDebtCard;

