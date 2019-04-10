import React, { Component } from "react";
import axios from "axios";
import Aux from "../../utils/Aux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      staff: [],
      loading: false,
      error: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.getAllStaff();
  }

  getAllStaff() {
    axios
      .get("/api/staff")
      .then(res => {
        this.setState({ staff: res.data });
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  getStaff(id) {
    axios
      .get(`/api/staff/${id}`)
      .then(res => {
        this.setState({ staff: res.data });
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  deleteStaff(id) {
    axios
      .delete(`/api/staff/${id}`)
      .then(res => {
        this.getAllStaff();
      })
      .catch(err => this.setState({ error: err.response.data }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.getStaff(this.props.match.params.id);
  }

  render() {
    const { staff, loading } = this.state;
    let staffContent;

    if (staff === null || loading) {
      staffContent = <Spinner />;
    } else {
      staffContent = (
        <div className="panel-body">
          <table
            width="100%"
            className="table table-striped table-bordered table-hover"
            id="dataTables-example"
          >
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {staff.map(staff => (
                <tr className="odd gradeX">
                  <Aux>
                    <td>
                      <Link to="/staff">{staff.name}</Link>
                    </td>
                    <td>{staff.phone}</td>
                    <td>{staff.email}</td>
                    <td>{staff.address}</td>
                    <td>
                      <Link to={`/staff/${staff._id}`}>
                        <button className="btn btn-warning btn-sm">Edit</button>
                      </Link>
                      <button
                        style={{ marginLeft: "5px" }}
                        className="btn btn-danger btn-sm"
                        onClick={this.deleteStaff.bind(this, staff._id)}
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
            <h1 className="page-header">All Staff</h1>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <strong>List of Staff</strong>
                </div>
                {staffContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
