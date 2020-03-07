// import React, { Component } from "react";

// import debtServices from "../../../services/debt.services";

// import "./debtDetails.scss";

// import { Link } from "react-router-dom";

// class debtDetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { debt: {} };
//     this.services = new debtServices();

//     console.log("las props por defecto serían estas:", this.props);
//   }

// //   componentDidMount = () => this.getDebtDetails();

// //   getDebtDetails = () => {
// //     this.services
// //       .getDebtDetails(this.props.match.params.id)
// //       .then(theDebt => this.setState({ debt: theDebt }))
// //       .catch(err => console.log(err));
// //   };

//   render() {
//     return (
//       <div>
//         <h3>Stats</h3>
//         <hr></hr>

//       </div>
//     );
//   }
// }

// export default debtDetails;