import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

function Update_Employee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        contact_no: "",
        email: "",
        local_address: "",
        permanent_address: "",
        pincode: ""
    });

    const loadUser = async () => {
        const resultCategory = await axios.get("employee/updateEmployee/"+id);
        console.log(resultCategory);
        setData(resultCategory.data)
    }

    function handleSubmit(e) {
        
        e.preventDefault();
        axios.post("employee/update", {
            id: id,
            name: data.name,
            contact_no: data.contact_no,
            email: data.email,
            local_address: data.local_address,
            permanent_address: data.permanent_address,
            pincode: data.pincode

        }).then(res => {
                alert("Form Submitted Successfully");
                console.log(res.data)
                navigate("/View_Employee")
            })
    }

    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    
    useEffect(() => {
        loadUser();
    }, []);

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
                                    Update Employee</li>
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
                            <Form onSubmit={e => handleSubmit(e)}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control 
                                            id="name"
                                            type="text" 
                                            placeholder="Enter name"
                                            defaultValue={data.name}
                                            onChange={e => handleChange(e)} 
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridContact">
                                        <Form.Label>Contact No</Form.Label>
                                        <Form.Control 
                                            id="contact_no"
                                            type="number" 
                                            placeholder="Enter contact no." 
                                            onChange={e => handleChange(e)}
                                            defaultValue={data.contact_no}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email Id</Form.Label>
                                        <Form.Control 
                                            id="email"
                                            type="email" 
                                            placeholder="Enter email" 
                                            defaultValue={data.email}
                                            onChange={e => handleChange(e)}
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Local Address</Form.Label>
                                    <Form.Control 
                                        id="local_address"
                                        placeholder="1234 Main St" 
                                        defaultValue={data.local_address}
                                        onChange={e => handleChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Permanent Address </Form.Label>
                                    <Form.Control 
                                        id="permanent_address"
                                        placeholder="Apartment, studio, or floor"
                                        defaultValue={data.permanent_address} 
                                        onChange={e => handleChange(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} controlId="formGridZip">
                                    <Form.Label>Pincode</Form.Label>
                                    <Form.Control 
                                        id="pincode"
                                        type="number"
                                        defaultValue={data.pincode}
                                        onChange={e => handleChange(e)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update Employee
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Update_Employee;