import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from "react-bootstrap";
import { Axios } from "axios";

function View_Recruiter() {
  const [data, setData] = useState([]);

  const fetchRecruiter = () => {
    fetch("http://localhost/api_cogent/api/recruiter/view")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.result);
      });
  };

  useEffect(() => {
    fetchRecruiter();
  }, []);

  const handleStatus = (id) => {
    Axios.get("http://localhost/api_cogent/api/recruiter/status/" + id)
      .then((result) => {
        console.log(result.user);
      });
    fetchRecruiter();
  };
  return (
    <section class="content">
      <div class="container-fluid">
        <div class="block-header">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Recruiter</h4>
                </li>
                <FaHome className="HomeIcon" />
                <li className="breadcrumb-item bcrumb-1">
                  <IoIosArrowForward className="Arrow" />
                  <Link className="nav-link" to="">
                    Home
                  </Link>
                </li>
                <li className="DashboardActive">
                  <IoIosArrowForward className="Arrow" />
                  View Recruiter
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="card">
              <div class="header">
                <ul class="header-dropdown m-r--5">
                  <li class="dropdown">
                    <Link
                      to="javascript:void(0);"
                      class="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <BiDotsVerticalRounded/> */}
                    </Link>
                    <ul class="dropdown-menu float-end">
                      <li>
                        <Link to="javascript:void(0);">Action</Link>
                      </li>
                      <li>
                        <Link to="javascript:void(0);">Another action</Link>
                      </li>
                      <li>
                        <Link to="javascript:void(0);">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Profile Image</th>
                    <th>Create Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.category_name}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleStatus(user.id)}
                        >
                          {user.recruiter_status}
                        </button>
                      </td>
                      <td>{user.address}</td>
                      <td>{user.pincode}</td>
                      <td>{user.profile_image}</td>
                      <td>{user.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default View_Recruiter;
