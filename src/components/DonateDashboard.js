import React from "react";
import { connect } from "react-redux";
import { currentUser } from "../actions/auth";

class Dashboard extends React.Component {

  render() {
    return <div>
      <h1>Donation Page</h1>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    current_user: state.currentUser,
  };
};

const mapDispatchToProps = {
  currentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
