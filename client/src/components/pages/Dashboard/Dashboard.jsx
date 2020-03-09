import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import DebtList from "../debtList/DebtList.jsx";
import DebtDetails from "../debtDetails/DebtDetails.jsx";
import DebtsSummary from "../DebtsSummary/DebtsSummary.jsx";
import "./DashBoard.scss";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="container-alldebts">
        <DebtList loggedInUser={this.props.loggedInUser} />
        <div className="container-charts">
          <Switch>
            <Route
              path="/allDebts/detail/"
              render={(props) => <DebtDetails  {...props} />}
            />
            <Route
              exact
              path="/allDebts"
              render={() => <DebtsSummary loggedInUser={this.props.loggedInUser} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

{
  /*(props) => <DebtDetails  {...props} />; */
}
export default Dashboard;
