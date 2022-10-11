import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';

function AddNotice() {
 
    const navigate = useNavigate();
    const [notice,setNotice] = useState()

    
    function handleChange(e) {
       setNotice(e.target.value)
       console.log(notice)
    }

    function handleSubmit(e) {
        e.preventDefault();
        let x = document.forms["myForm"]["NForm"].value
        if (x == ""){
            alert("Please enter your notice period");
            return false;
        }
        axios.post("noticeperiod/add", {
            notice_period: notice
        })
            .then((res) => {
                alert("Form Submitted Successfully");
                console.log(res)
                navigate("/Viewnotice");
            })
    }

    return(
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Notice</h4>
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
                                    Add Notice</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            
                            <Form onSubmit={(e) => handleSubmit(e)} name= "myForm">
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Notice</Form.Label>
                                    <Form.Control
                                        name= "NForm" 
                                        type="text"
                                        id="Notice"
                                        className="utf-with-border"
                                        placeholder="Notice"
                                        onChange={(e) => handleChange(e)}
                                        value={notice}
                                    />
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col >
                                        <Button type="submit" style={{fontSize:"12px",float:"right",marginRight:"5px"}}>Add Notice</Button>
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

export default AddNotice;