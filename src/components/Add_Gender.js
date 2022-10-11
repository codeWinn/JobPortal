import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';

const AddGender = () =>{
    const navigate = useNavigate();
   
    const [gender, setGender] = useState();

    
    function handleChange(e) {
       setGender(e.target.value)
       console.log(gender)
    }

    function handleSubmit(e) {
        e.preventDefault();
        let x = document.forms["myForm"]["GForm"].value;
        if (x == ""){
            alert("Please enter your gender");
            return false;
        }
        axios.post("gender/add", {
            gender: gender
        })
            .then((res) => {
                alert("Form Submitted Successfully");
                console.log(res)
                navigate("/viewGender");
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
                                    <h4 className="page-title">Category</h4>
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
                                    Add Gender</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            
                            <Form onSubmit={(e) => handleSubmit(e)} name= "myForm">
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Gender</Form.Label>
                                    
                                    <Form.Control 
                                        name= "GForm"
                                        type="text"
                                        id="gender"
                                        className="utf-with-border"
                                        placeholder="Gender"
                                        onChange={(e) => handleChange(e)}
                                        value={gender}
                                    />
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col >
                                        <Button type="submit" style={{fontSize:"12px",float:"right",marginRight:"5px"}}>Add Gender</Button>
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

export default AddGender;