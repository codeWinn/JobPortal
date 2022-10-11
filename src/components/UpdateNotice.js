import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';

const UpdateNotice = () =>{

const { id } = useParams();
const navigate = useNavigate();
const urlPost = "noticeperiod/update";

const [notice, setnotice] = useState()


const loadnotice = async () => {
    const resultNotice = await axios.get("noticeperiod/view/" + id);
    console.log(resultNotice);
    setnotice(resultNotice.data.notice_period);
}

function handleSubmit(e) {

    e.preventDefault();
    axios.post(urlPost, {
        id: id,
        notice_period: notice

    }).then(res => {
        alert("Form Submitted Successfully");
        console.log(res.data)
        navigate("/Viewnotice")
    })
}
function handleChange(e) {
    setnotice(e.target.value)
}

useEffect(() => {
    loadnotice();
}, []);

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
                                    Update Notice</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="notice"
                                        className="utf-with-border"
                                        placeholder="notice"
                                        onChange={(e) => handleChange(e)}
                                        value={notice}
                                    />
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col >
                                        <Button type="submit">Update Notice</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
)
};
export default UpdateNotice;
