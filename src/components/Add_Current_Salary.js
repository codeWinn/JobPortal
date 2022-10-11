import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';

function Add_Current_Salary() {

  const navigate = useNavigate();
  const [data, setData] = useState({
    current_salary: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let x= document.forms["myForm"]["CForm"].value;
    if(x == ""){
      alert("Please enter your current salary.")
      return false;
    }
    axios.post("current_salary/add", {
      current_salary: data.current_salary
    })
      .then((res) => {
        Swal.fire("Current Salary Add Successfully");
        console.log(res.data);
        navigate("/View_Current_Salary");
      })

  }

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value
    setData(newData);
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Current Salary</h4>
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
                  Add Current Salary</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <Form onSubmit={(e) => handleSubmit(e)} name= "myForm">
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Current Salary</Form.Label>
                  <Form.Control
                    name= "CForm"
                    type="text"
                    id="current_salary"
                    className="utf-with-border"
                    placeholder="Enter Current Salary"
                    onChange={(e) => handleChange(e)}
                    value={setData.current_salary}
                  />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Col >
                    <Button type="submit">Add Salary</Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Add_Current_Salary