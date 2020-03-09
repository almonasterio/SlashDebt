import React, { Component } from "react";
import "./DebtCard.scss";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const DebtCard = props => {
  const {
    name,
    remaining,
    category,
    deleteButton,
    userId,
    _id,
    minMonthlyPayment
  } = props;

  const _handleForm = e => {
    e.preventDefault();
    deleteButton(userId, _id);
  };

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Accordion.Toggle
            className="card-title"
            as={Button}
            variant="link"
            eventKey="1"
          >
            <h3>{name}</h3>
            <h4>$ {remaining}</h4>
            <button type="submit" onClick={e => _handleForm(e)}>
              Delete
            </button>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>{category}</Card.Body>

          {/* <Card.Body>{remaining}</Card.Body> */}
          {/* <Card.Body>{minMonthlyPayment}</Card.Body> */}
        </Accordion.Collapse>
        <Link
          to={{
            pathname: "/allDebts/detail",
            state: {
              name,
              remaining,
              category,
              userId,
              _id,
              minMonthlyPayment
            }
          }}
        >
          View Details
        </Link>
      </Card>
    </Accordion>
  );
};

export default DebtCard;
