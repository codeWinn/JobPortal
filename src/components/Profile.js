import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const Profile = () => {

  const id = localStorage.getItem('auth_token');
  const [data, setdata] = useState({
    name: "",
    email: "",
    address: "",
    mobile_no: "",
    company_name: "",

  })
  const navigate = useNavigate();

  const fetch = () => {
    axios.get(`/users/view/${id}`)
    .then((res) => {
      console.log(res);
      setdata(res.data);
    });
  }

  function handleSubmit(e){
    e.preventDefault();
  }

  function handleChange(e) {
    e.preventDefault();
    console.log(id);
    console.log(data.name);

    axios.post("users/update",
      {
        id: id,
        name: data.name,
        email: data.email,
        address: data.address,
        mobile_no: data.mobile_no,
        company_name: data.company_name,
      }).then((res) => {
        console.log(res.data);
        localStorage.setItem('auth_name', data.name);
        alert("successfully Updated");
        navigate('/Dashboard')
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title"> Profile Update</h4>
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
                  Profile Update
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Form className="label-custom-0" onSubmit={e => handleSubmit(e)}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="Enter name"
                      defaultValue={data.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="number"
                      id="mobile_no"
                      placeholder="Enter contact no."
                      defaultValue={data.mobile_no}
                      onChange={(e) => handleChange(e)}
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
                      defaultValue={data.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label> Address</Form.Label>
                  <Form.Control
                    type="text"
                    id="address"
                    placeholder="1234 Main St"
                    defaultValue={data.address}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Company_name</Form.Label>
                  <Form.Control
                    type="text"
                    id="company_name"
                    placeholder="1234 Main St"
                    defaultValue={data.company_name}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                {/* <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      id="profile_image"
                      name="image"
                    />
                  </Form.Group>
                </Row> */}
                <Button variant="primary" type="submit" style={{ fontSize: "12px", float: "right", marginTop: "10px" }} >
                  Update Profile
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Profile;