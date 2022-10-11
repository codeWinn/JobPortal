import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

function Add_Employee() {
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState({
    name: "",
    contact_no: "",
    email: "",
    local_address: "",
    permanent_address: "",
    pincode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const file = e.target.files[0];
    // const formData = new FormData();
    // alert (formData.append("file",file));
    
    await axios.post("employee/add",{
      name:employee.name,
      contact:employee.contact_no,
      email:employee.email,
      local_address: employee.local_address,
      permanent_address:employee.permanent_address,
      Notice_Period : employee.Notice_period,
      Pincode:employee.pincode,
      image :employee.profile_image,
    })
   
      .then((res) => {
        alert("Form Submitted Successfully");
        console.log(res);
        navigate("/View_Employee")
      });
  };

  function handleChange(e) {
    const newdata = { ...employee };
    newdata[e.target.id] = e.target.value;
    setEmployee(newdata);
    console.log(newdata);
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Employee</h4>
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
                  Add Employee
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="header">
                <ul className="header-dropdown m-r--5">
                  <li className="dropdown">
                    <Link
                      to="javascript:void(0);"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <BiDotsVerticalRounded/> */}
                    </Link>
                    <ul className="dropdown-menu float-end">
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
              <Form onSubmit={(e) => handleSubmit(e)} name="myForm">
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="Enter name"
                      onChange={(e) => handleChange(e)}
                      value={employee.name}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="number"
                      id="contact_no"
                      placeholder="Enter contact no."
                      onChange={(e) => handleChange(e)}
                      value={employee.contact_no}
                      required
                      
                      
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      onChange={(e) => handleChange(e)}
                      value={employee.email}
                      required
                       
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Local Address</Form.Label>
                  <Form.Control
                    type="text"
                    id="local_address"
                    placeholder="1234 Main St"
                    onChange={(e) => handleChange(e)}
                    value={employee.local_address}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Permanent Address </Form.Label>
                  <Form.Control
                    type="text"
                    id="permanent_address"
                    placeholder="Apartment, studio, or floor"
                    onChange={(e) => handleChange(e)}
                    value={employee.permanent_address}
                    required
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group className="mb-3" as={Col}>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="number"
                      id="pincode"
                      placeholder="Pincode ex: 110032"
                      onChange={(e) => handleChange(e)}
                      value={employee.pincode}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      id="profile_image"
                      name="image"
                      required
                      // multiple={false}
                      // onChange={(e) => handleChangeImage(e)}
                    //   value={file}
                    />
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                  Add Employee
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Add_Employee;
