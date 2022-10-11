import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function Update_Qualification() {
      const { id } = useParams();
      const navigate = useNavigate();

      const [qualification, setQualification] = useState({
           high_qualification: ""
      });

    const urlPost = "qualification/update";

    const loadQualification = async () => {
        const result = await axios.get("qualification/view/" + id);
        console.log(result);
        setQualification(result.data)
    }
    function handleSubmit(e) {

        e.preventDefault();
        axios.post(urlPost, {
            id: id,
            high_qualification: qualification.high_qualification

        }).then(res => {
            Swal.fire("Qualification Update Successfully");
            console.log(res.data)
            navigate("/View_Qualification")
        })
    }
    function handleChange(e) {
        const newdata = { ...qualification }
        newdata[e.target.id] = e.target.value
        setQualification(newdata)
        console.log(newdata)
    }

    useEffect(() => {
     loadQualification();
    }, []);

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
                                    Update Qualification</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>High Qualification</Form.Label>
                                    <Form.Control
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
                                        <Button type="submit">Update Qualification</Button>
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
export default Update_Qualification