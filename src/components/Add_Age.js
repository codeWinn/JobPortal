import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';


function Add_Age() {
    const navigate = useNavigate();
    const [ageData, setAgeData] = useState({
        age: ""
    })

    function handleSubmit(e) {
        e.preventDefault();
        let x = document.forms["myForm"]["AForm"].value;
        if(x==""){
            alert("Please enter your age");
            return false;
        }
        axios.post("age/add", {
            age: ageData.age

        })
            .then(res => {
                Swal.fire("Add Age Successfully")
                console.log(res.ageData);
                navigate("/View_Age");
            })
    }
    function handleChange(e) {
        const newdata = { ...ageData }
        newdata[e.target.id] = e.target.value
        setAgeData(newdata)
        console.log(newdata)
    }

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Age</h4>
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
                                    Add Age</li>
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
                                        <Link to="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
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
                                                <Link to="javascript:void(0);">Something else here</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <Form onSubmit={(e) => handleSubmit(e)} name="myForm">
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control 
                                        name="AForm"
                                        type="text"
                                        id="age"
                                        className="utf-with-border"
                                        placeholder="Enter Age"
                                        onChange={(e) => handleChange(e)}
                                        value={ageData.age}
                                    />
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col >
                                        <Button type="submit">Add Age</Button>
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

export default Add_Age;