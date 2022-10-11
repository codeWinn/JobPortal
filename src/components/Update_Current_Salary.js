import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function Update_Current_Salary() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    current_salary: ""
  });


  const loadCurrentSalary = async () => {
    const result = await axios.get("current_salary/view/" + id);
    console.log(result);
    setData(result.data)
  }
  function handleSubmit(e) {

    e.preventDefault();
    axios.post("current_salary/update", {
      id: id,
      current_salary: data.current_salary

    }).then(res => {
      Swal.fire("Current Salary Update Successfully");
      console.log(res.data)
      navigate("/View_Current_Salary")
    })
  }
  function handleChange(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  useEffect(() => {
    loadCurrentSalary();
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Current Salary</h4>
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
                  Update Current Salary</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Current Salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="current_salary"
                    className="utf-with-border"
                    placeholder="Enter Current Salary"
                    onChange={(e) => handleChange(e)}
                    value={data.current_salary}
                  />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Col >
                    <Button type="submit">Update Salary</Button>
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
export default Update_Current_Salary