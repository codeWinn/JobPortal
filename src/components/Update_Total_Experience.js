import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function Update_Total_Experience() {

     const { id } = useParams();
     const navigate = useNavigate();

     const [data, setData] = useState({
          experience: ""
     });

     const loadTotalExperience = async () => {
          const result = await axios.get("total_experience/view/" + id);
          console.log(result);
          setData(result.data)
     }
     function handleSubmit(e) {

          e.preventDefault();
          axios.post("total_experience/update", {
               id: id,
               experience: data.experience

          }).then(res => {
               Swal.fire("Total Experience Update Successfully");
               console.log(res.data)
               navigate("/View_Total_Experience")
          })
     }
     function handleChange(e) {
          const newdata = { ...data }
          newdata[e.target.id] = e.target.value
          setData(newdata)
          console.log(newdata)
     }

     useEffect(() => {
          loadTotalExperience();
     }, []);

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
                                             Update Total Experience</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                                   <Form onSubmit={(e) => handleSubmit(e)}>
                                        <Form.Group className="mb-3" controlId="formGroupName">
                                             <Form.Label>Total Experience</Form.Label>
                                             <Form.Control
                                                  type="text"
                                                  id="experience"
                                                  className="utf-with-border"
                                                  placeholder="Enter Total Experience"
                                                  onChange={(e) => handleChange(e)}
                                                  value={data.experience}
                                             />
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                             <Col >
                                                  <Button type="submit">Update Experience</Button>
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
export default Update_Total_Experience