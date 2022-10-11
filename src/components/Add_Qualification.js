import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';

function Add_Qualification() {

     const navigate = useNavigate();
     const [qualification, setQualification] = useState({
          high_qualification: ""
     });

     const handleSubmit = (e) =>{
          e.preventDefault();
          let x= document.forms["myForm"]["QForm"].value;
    if(x == ""){
      alert("Please enter your Highest Qualification.")
      return false;
    }
          axios.post("qualification/add",{
               high_qualification: qualification.high_qualification
          })
          .then((res)=>{
               Swal.fire("Qualification Add Successfully");
               console.log(res.setQualification);
               navigate("/View_Qualification");
          })
     }

     const handleChange = (e) =>{
          const newData = {...qualification};
          newData[e.target.id] = e.target.value
          setQualification(newData);
     }

     return (
          <section className="content">
               <div className="container-fluid">
                    <div className="block-header">
                         <div className="row">
                              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                   <ul className="breadcrumb breadcrumb-style ">
                                        <li className="breadcrumb-item">
                                             <h4 className="page-title">High Qualification</h4>
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
                                             Add Qualification</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                                   <Form onSubmit={(e) => handleSubmit(e)} name= "myForm">
                                        <Form.Group className="mb-3" controlId="formGroupName">
                                             <Form.Label>High Qualification</Form.Label>
                                             <Form.Control
                                                  name= "QForm"
                                                  type="text"
                                                  id="high_qualification"
                                                  className="utf-with-border"
                                                  placeholder="Enter Qualification"
                                                  onChange={(e) => handleChange(e)}
                                                  value={qualification.high_qualification}
                                             />
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                             <Col >
                                                  <Button type="submit">Add Qualification</Button>
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

export default Add_Qualification