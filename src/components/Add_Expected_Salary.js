import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';

function Add_Expected_Salary() {

     const navigate = useNavigate();
     const [data, setData] = useState({
          expected_salary: ""
     });

     const handleSubmit = (e) => {
          e.preventDefault();
          let x= document.forms["myForm"]["SForm"].value;
          if(x == ""){
               alert("Please enter your Expected Salary");
               return false;
          }
          axios.post("expectedsalary/add", {
               expected_salary: data.expected_salary
          })
               .then((res) => {
                    Swal.fire("Expected Salary Add Successfully");
                    console.log(res.data);
                    navigate("/View_Expected_Salary");
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
                                             <h4 className="page-title">Expected Salary</h4>
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
                                             Add Expected Salary</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                                   <Form onSubmit={(e) => handleSubmit(e)} name="myForm">
                                        <Form.Group className="mb-3" controlId="formGroupName">
                                             <Form.Label>Expected Salary</Form.Label>
                                             <Form.Control
                                                  name= "SForm"
                                                  type="text"
                                                  id="expected_salary"
                                                  className="utf-with-border"
                                                  placeholder="Enter Expected Salary"
                                                  onChange={(e) => handleChange(e)}
                                                  value={setData.expected_salary}
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

export default Add_Expected_Salary