import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';

function Add_Total_Experience() {

     const navigate = useNavigate();
     const [data, setData] = useState({
          experience: ""
     });

     const handleSubmit = (e) => {
          e.preventDefault();
          let x = document.forms["myForm"]["TForm"].value;
          if(x== ""){
               alert("Please add your total experiance");
               return false;
          }
          axios.post("total_experience/add", {
               experience: data.experience
          })
               .then((res) => {
                    Swal.fire("Total Experience Add Successfully");
                    console.log(res.data);
                    navigate("/View_Total_Experience");
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
                                             <h4 className="page-title">Total Experience</h4>
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
                                             Add Total Experience</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                                   <Form onSubmit={(e) => handleSubmit(e)} name= "myForm">
                                        <Form.Group className="mb-3" controlId="formGroupName">
                                             <Form.Label>Total Experience</Form.Label>
                                             <Form.Control
                                                  name= "TForm"
                                                  type="text"
                                                  id="experience"
                                                  className="utf-with-border"
                                                  placeholder="Enter total Experience"
                                                  onChange={(e) => handleChange(e)}
                                                  value={setData.experience}
                                             />
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                             <Col >
                                                  <Button type="submit">Add Experience</Button>
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

export default Add_Total_Experience