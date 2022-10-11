import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';

const UpdateGender = () =>{

const { id } = useParams();
const navigate = useNavigate();

const [location, setLocation] = useState()


const loadLocation = async () => {
    const resultLocation = await axios.get("location/view/" + id);
    console.log(resultLocation);
    setLocation(resultLocation.data.location);
}

function handleSubmit(e) {

    e.preventDefault();
    axios.post("location/update", {
        id: id,
        location: location

    }).then(res => {
        alert("Form Submitted Successfully");
        console.log(res.data)
        navigate("/PreferredLocation")
    })
}
function handleChange(e) {
   setLocation(e.target.value)
}

useEffect(() => {
    loadLocation();
}, []);

return(
<section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Gender</h4>
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
                                    Update Gender</li>
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
                                        id="location"
                                        className="utf-with-border"
                                        placeholder="location"
                                        onChange={(e) => handleChange(e)}
                                        value={location}
                                    />
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col >
                                        <Button type="submit">Update Location</Button>
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
export default UpdateGender;
