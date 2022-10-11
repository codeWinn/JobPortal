import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from "react-bootstrap";
import Axios from "axios";

function Add_Job_Posting() {
  const navigate = useNavigate();
  const [designation, setDesignation] = useState([]);
  const [category, setCategory] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [selected, setSelected] = useState({
    gender: "",
    total_experience: ""
  });
  const [data, setData] = useState({
    designation_id: "",
    age: "",
    department_id: "",
    industry_id: "",
    expected_salary: "",
  });

  const fetchDataIndustry = () => {
    Axios.get("industry/view_industry")
      .then((response) => {
        console.log(response.data.result)
        setIndustry(response.data.result);
      }
      )
  }

  useEffect(() => {
    fetchDataIndustry();
  }, []);

  const fetchDataDepartment = () => {
    Axios.get("job_category/view_job")
      .then((response) => {
        console.log(response.data.result)
        setCategory(response.data.result);
      }
      )
  }

  useEffect(() => {
    fetchDataDepartment();
  }, []);

  const fetchDataDesignation = () => {
    Axios.get("category/view")
      .then((response) => {
        console.log(response.data.result)
        setDesignation(response.data.result);
      }
      )
  }

  useEffect(() => {
    fetchDataDesignation();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    Axios
      .post("jobposting/add", {
        designation_id: data.designation_id,
        age: data.age,
        gender: data.gender,
        total_experience: data.total_experience,
        department_id: data.department_id,
        industry_id: data.industry_id,
        expected_salary: data.expected_salary,
        qualification: data.qualification,
        location: data.location,
        state: data.state
      })
      .then((res) => {
        alert("Form Submitted Successfully");
        navigate("/jobPosts");
      });
  }
  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    const selectValue = { ...selected };
    selectValue[e.target.id] = e.target.value
    setSelected(selectValue);
    console.log(newdata);
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Job Posting Category</h4>
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
                  Add Job Posting Category
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Row className="mb-3 p-1">
                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Designation Name</Form.Label>
                    <Form.Select
                      defaultValue="Choose Designation Name"
                      id="designation_id"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">---Choose Department---</option>
                      {designation.map((items) => (
                        <option key={items.id} value={items.id}>
                          {items.designation_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      id="age"
                      placeholder="Enter Age"
                      onChange={(e) => handleChange(e)}
                      defaultValue={data.age}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 p-1">
                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      value={selected.gender}
                      id="gender"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>--- Choose Gender ---</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Select
                      defaultValue="Choose Department"
                      id="department_id"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">---Choose Department---</option>
                      {category.map((items) => (
                        <option key={items.id} value={items.id}>
                          {items.category_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3 p-1">
                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Total Exprience</Form.Label>
                    <Form.Select
                      value={selected.total_experience}
                      id="total_experience"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>--- Choose Exprience Year ---</option>
                      <option value="Fresher">Fresher</option>
                      <option value="0-1 Year">0-1 Year</option>
                      <option value="2 Year">2 Year</option>
                      <option value="3 Year">3 Year</option>
                      <option value="4 Year">4 Year</option>
                      <option value="5 Year">5 Year</option>
                      <option value="7 Year">7 Year</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Expected Salary</Form.Label>
                    <Form.Control
                      type="text"
                      id="expected_salary"
                      placeholder="Enter Expected Salary"
                      onChange={(e) => handleChange(e)}
                      defaultValue={data.expected_salary}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 p-1">
                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Qualification</Form.Label>
                    <Form.Select
                      value={selected.qualification}
                      id="qualification"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>--- Choose Qualification ---</option>
                      <option value="10th High School">10th High School</option>
                      <option value="12th Intermediate">12th Intermediate</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Post Graduation">Post Graduation</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Industry Name</Form.Label>
                    <Form.Select
                      defaultValue="Choose Industry"
                      id="industry_id"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">---Choose Industry Name---</option>
                      {industry.map((items) => (
                        <option key={items.id} value={items.id}>
                          {items.industry_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3 p-1">
                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                      value={selected.location}
                      id="location"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>--- Choose Location ---</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Noida">Noida</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Indore">Indore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Bhubaneshwar">Bhubaneshwar</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kochi">Kochi</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Trivandrum">Trivandrum</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="custom-label">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      value={selected.state}
                      id="state"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>--- Choose State ---</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Assam">Assam</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit" style={{ fontSize: "12px", float: "right", marginRight: "5px", marginTop: "10px" }}>
                  Add Job Posting
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Add_Job_Posting;
