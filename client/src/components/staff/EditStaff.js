import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import isEmpty from "../../validation.js/is-empty";

class EditStaff extends Component {
  constructor() {
    super();

    this.state = {
      staff: {},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getStaff(this.props.match.params.id);
  }

  getStaff(id) {
    axios
      .get(`/api/staff/${id}`)
      .then(res => {
        this.setState({ staff: res.data });
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  updateStaff(id) {
    axios
      .patch(`/api/staff/${id}`)
      .then(res => {
        this.setState({ staff: res.data });
        this.props.history.push("/staff");
        console.log("HEllo");
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  onChange(e) {
    this.setState({
      staff: {
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.updateStaff(this.props.match.params.id);
  }

  render() {
    const { staff, errors } = this.state;
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
            <h1 class="page-header">Edit: {staff.name}</h1>
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
                        value={staff.name}
                        info="Enter staff's name"
                        error={errors.name}
                      />

                      <TextFieldGroup
                        name="email"
                        label="Email"
                        placeholder="Email"
                        onChange={this.onChange}
                        type="email"
                        value={staff.email}
                        info="Enter staff's email"
                      />
                    </div>
                    <div class="col-lg-6">
                      <TextFieldGroup
                        name="phone"
                        label="Phone"
                        onChange={this.onChange}
                        type="text"
                        dataFormat="US"
                        value={staff.phone}
                        info="Enter staff's phone number"
                      />

                      <TextFieldGroup
                        name="address"
                        label="Address"
                        placeholder="Address"
                        onChange={this.onChange}
                        type="text"
                        value={staff.address}
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

export default EditStaff;
