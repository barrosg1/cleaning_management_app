import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import isEmpty from "../../validation.js/is-empty";

class EditClient extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      company: "",
      email: "",
      location: "",
      phone: "",
      website: "",
      errors: {},
      client: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getClient(this.props.match.params.id);
  }

  getClient(id) {
    axios
      .get(`/api/clients/${id}`)
      .then(res => {
        this.setState({ client: res.data });
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { client, errors } = this.state;
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
            <h1 class="page-header">Edit User ({client.name})</h1>
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
                        name="company"
                        label="Company"
                        placeholder="Company"
                        onChange={this.onChange}
                        type="text"
                        value={this.state.company}
                        info="Enter client's company name"
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
                        name="location"
                        label="Location"
                        placeholder="Location"
                        onChange={this.onChange}
                        type="text"
                        value={this.state.location}
                        info="Enter client's location or address"
                      />

                      <TextFieldGroup
                        name="website"
                        label="Website"
                        placeholder="Website"
                        onChange={this.onChange}
                        type="text"
                        value={this.state.website}
                        info="Example: http://www.company.com"
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

export default EditClient;
