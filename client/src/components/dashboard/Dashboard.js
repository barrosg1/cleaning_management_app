import React, { Component } from "react";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      clients: [],
      loading: false,
      error: {}
    };
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Dashboard</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
