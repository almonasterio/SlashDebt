import React, { Component } from "react";
import "./DebtCard.scss";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";


const DebtCard =({name, remaining,category,minMonthlyPayment}) => {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle className="card-title" as={Button} variant="link" eventKey="0">
              <h3>{name}</h3>
              <h4>$ {remaining}</h4>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{category}</Card.Body>

            {/* <Card.Body>{remaining}</Card.Body> */}
            {/* <Card.Body>{minMonthlyPayment}</Card.Body> */}
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
 
export default DebtCard
