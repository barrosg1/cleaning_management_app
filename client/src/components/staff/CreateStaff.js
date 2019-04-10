import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import isEmpty from "../../validation.js/is-empty";

class CreateClient extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newStaff = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone
    };

    axios
      .post("/api/staff", newStaff)
      .then(res => this.props.history.push("/staff"))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    let errorAlert;

    if (!isEmpty(errors)) {
      errorAlert = <ErrorAlert errors={errors} />;
    } else {
      errorAlert = null;
    }

    return (
      <div id="page-wrapper">
        <div class="row">
          <div class="col-lg-12">
            <h1 class="page-header">Add Staff</h1>
          </div>
        </div>

        {errorAlert}

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">* = required fields</div>
              <div class="panel-body">
                <div class="row">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div class="col-lg-6">
                      <TextFieldGroup
                        name="name"
                        label="Name"
                        placeholder="* Name"
                        onChange={this.onChange}
                        type="text"
                        value={this.state.name}
                        info="Enter client's name"
                        error={errors.name}
                      />

                      <TextFieldGroup
                        name="email"
                        label="Email"
                        placeholder="Email"
                        onChange={this.onChange}
                        type="email"
                        value={this.state.email}
                        info="Enter client's email"
                      />
                    </div>
                    <div class="col-lg-6">
                      <TextFieldGroup
                        name="phone"
                        label="Phone"
                        onChange={this.onChange}
                        type="text"
                        dataFormat="US"
                        value={this.state.phone}
                        info="Enter client's phone number"
                      />

                      <TextFieldGroup
                        name="address"
                        label="Address"
                        placeholder="Address"
                        onChange={this.onChange}
                        type="text"
                        value={this.state.location}
                        info="Enter staff's address"
                      />
                    </div>
                    <div className="col-md-6">
                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateClient;
