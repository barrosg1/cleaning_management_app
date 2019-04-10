import React, { Component } from "react";
import axios from "axios";
import Aux from "../../utils/Aux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      clients: [],
      loading: false,
      error: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.getClients();
  }

  getClients() {
    axios
      .get("/api/clients")
      .then(res => {
        this.setState({ clients: res.data });
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  getClient(id) {
    axios
      .get(`/api/clients/${id}`)
      .then(res => {
        this.setState({ client: res.data });
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  deleteClient(id) {
    axios
      .delete(`/api/clients/${id}`)
      .then(res => {
        this.getClients();
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.getClient(this.props.match.params.id);
  }

  render() {
    const { clients, loading } = this.state;
    let clientContent;

    if (clients === null || loading) {
      clientContent = <Spinner />;
    } else {
      clientContent = (
        <div className="panel-body">
          <table
            width="100%"
            className="table table-striped table-bordered table-hover"
            id="dataTables-example"
          >
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th>Company</th>
                <th>Website</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr className="odd gradeX">
                  <Aux>
                    <td>
                      <Link to="/create-client">{client.name}</Link>
                    </td>
                    <td>{client.phone}</td>
                    <td>{client.email}</td>
                    <td>{client.location}</td>
                    <td>{client.company}</td>
                    <td>{client.website}</td>
                    <td>
                      <Link to={`/clients/${client._id}`}>
                        <button className="btn btn-warning btn-sm">Edit</button>
                      </Link>
                      <button
                        style={{ marginLeft: "5px" }}
                        className="btn btn-danger btn-sm"
                        onClick={this.deleteClient.bind(this, client._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </Aux>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div id="page-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">All Clients</h1>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <strong>List of Clients</strong>
                </div>
                {clientContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
