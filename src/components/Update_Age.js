import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";


function Update_Age() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [ageUpdate, setAgeUpdate] = useState({
        age: ""
    })


    const loadAge = async () => {
        const result = await axios.get("age/view/" + id);
        console.log(result);
        setAgeUpdate(result.data)
    }
    function handleSubmit(e) {

        e.preventDefault();
        axios.post("age/update", {
            id: id,
            age: ageUpdate.age

        }).then(res => {
            Swal.fire("Age Update Successfully");
            console.log(res.data)
            navigate("/View_Age")
        })
    }
    function handleChange(e) {
        const newdata = { ...ageUpdate }
        newdata[e.target.id] = e.target.value
        setAgeUpdate(newdata)
        console.log(newdata)
    }

    useEffect(() => {
        loadAge();
    }, []);

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
                                    Update Age</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="age"
                                        className="utf-with-border"
                                        placeholder="Enter Age"
                                        onChange={(e) => handleChange(e)}
                                        value={ageUpdate.age}
                                    />
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col >
                                        <Button type="submit">Update Age</Button>
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
export default Update_Age;