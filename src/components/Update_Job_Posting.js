import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from "react-bootstrap";
import axios from "axios";


const  Update_Job_Posting = () =>{

     const { id } = useParams();
     const navigate = useNavigate();
     const urlPost = "/job_posting/update";
     const [jobsData, setJobsData] = useState({
          designation_id: "",
          gender: "",
          department_id: "",
          total_experience: "",
          expected_salary: "",
          qualification: "",
          industry_id: "",
          location: "",
          state: "",
          company_name: "",
          role_responsliblity: "",
          application_alert: "",
          interviewer_name: "",
          contact_no: "",
          interview_type: "",
          interview_day: "",
          interview_time: "",
          contact_view: "",
          google_location: "",
          interview_address: "",
          reminder: "",
          paid_response: ""
     });

     const [designation, setDesignation] = useState([]);
     const [category, setCategory] = useState([]);
     const [industry, setIndustry] = useState([]);
     const [qualification, setQualification] = useState([]);
     // const []
     const fetchDataIndustry = () => {
          axios.get("/industry/view_industry")
          .then((res)=>{
               console.log(res);
               setIndustry(res.data.result);
          });
     };

     useEffect(() => {
          fetchDataIndustry();
     }, []);

     const fetchDataDepartment = () => {
          axios.get("/job_category/view_job")
          .then((data)=>{
               console.log(data);
               setCategory(data.data.result);
          });
     };

     useEffect(() => {
          fetchDataDepartment();
     }, []);

     const fetchDataDesignation = () => {
          axios.get("/category/view")
          .then((response)=>{
               console.log(response);
               setDesignation(response.data.result);
          });
     };

     useEffect(() => {
          fetchDataDesignation();
     }, []);

     function handleSubmit(e) {
          e.preventDefault();
          axios
               .post(urlPost, {
                    id: id,
                    designation_id: jobsData.designation_id,
                    gender: jobsData.gender,
                    department_id: jobsData.department_id,
                    total_experience: jobsData.total_experience,
                    expected_salary: jobsData.expected_salary,
                    qualification: jobsData.qualification,
                    industry_id: jobsData.industry_id,
                    location: jobsData.location,
                    state: jobsData.state,
                    role_responsliblity: jobsData.role_responsliblity,
                    company_name: jobsData.company_name,
                    application_alert: jobsData.application_alert,
                    interviewer_name: jobsData.interviewer_name,
                    contact_no: jobsData.contact_no,
                    interview_type: jobsData.interview_type,
                    interview_day: jobsData.interview_day,
                    interview_time: jobsData.interview_time,
                    contact_view: jobsData.contact_view,
                    google_location: jobsData.google_location,
                    interview_address: jobsData.interview_address,
                    reminder: jobsData.reminder,
                    paid_response: jobsData.paid_response,

               })
               .then((res) => {
                    alert("Form Submitted Successfully");
                    console.log(res.jobsData);
                    navigate("/jobPosts");
               });
     }
     function handleChange(e) {
          const newdata = { ...jobsData };
          newdata[e.target.id] = e.target.value;
          setJobsData(newdata);
          console.log(newdata);
     }

     const loadJobsPosting = async () => {
          const resData = await axios.get("/job_posting/views/" + id);
          console.log(resData);
          setJobsData(resData.data);
     };

     useEffect(() => {
          loadJobsPosting();
     }, []);

     

     return (
          <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Update Job Post</h4>
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
                                    Update Job Posting
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Form onSubmit={(e) => handleSubmit(e)}>
                                        <Row className="mb-3 ">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Designation Name</Form.Label>
                                                  <Form.Select
                                                       value={jobsData.designation_id}
                                                       id="designation_id"
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       {/* <option value="0">---Choose Department---</option> */}
                                                       {designation.map((items) => (
                                                            <option kye={items.id} value={items.id}>
                                                                 {items.designation_name}
                                                            </option>
                                                       ))}
                                                  </Form.Select>
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Gender</Form.Label>
                                                  <Form.Select
                                                       id="gender"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.gender}
                                                  >
                                                       <option>--- Choose Gender ---</option>
                                                       <option value="Male">Male</option>
                                                       <option value="Female">Female</option>
                                                       <option value="Other">Other</option>
                                                  </Form.Select>
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Department Name</Form.Label>
                                                  <Form.Select
                                                       id="department_id"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.department_id}
                                                  >
                                                       {/* <option value="0">---Choose Department---</option> */}
                                                       {category.map((items) => (
                                                            <option kye={items.id} value={items.id}>
                                                                 {items.category_name}
                                                            </option>
                                                       ))}
                                                  </Form.Select>
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Total Experience</Form.Label>
                                                  <Form.Select
                                                       id="total_experience"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.total_experience}
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
                                        </Row>
                                        <Row className="mb-3 ">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Expected Salary</Form.Label>
                                                  <Form.Select
                                                       id="expected_salary"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.expected_salary}
                                                  >
                                                       <option>--- Choose Expected Salary ---</option>
                                                       <option value="20000">20000</option>
                                                       <option value="25000">25000</option>
                                                       <option value="30000">30000</option>
                                                       <option value="40000">40000</option>
                                                       <option value="50000">50000</option>
                                                  </Form.Select>
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Qualification</Form.Label>
                                                  <Form.Select
                                                       id="qualification"
                                                       value={jobsData.qualification}
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       <option>--- Choose Qualification ---</option>
                                                       <option value="10th">10th or Below 10th</option>
                                                       <option value="12th">12th Pass</option>
                                                       <option value="Diploma">Diploma</option>
                                                       <option value="ITI">ITI</option>
                                                       <option value="Graduation">Graduate</option>
                                                       <option value="Post Graduation">Post Graduate</option>
                                                  </Form.Select>
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Industry Name</Form.Label>
                                                  <Form.Select
                                                       value={jobsData.industry_id}
                                                       id="industry_id"
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       {/* <option value="0">---Choose Industry Name---</option> */}
                                                       {industry.map((items) => (
                                                            <option kye={items.id} value={items.id}>
                                                                 {items.industry_name}
                                                            </option>
                                                       ))}
                                                  </Form.Select>
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Location</Form.Label>
                                                  <Form.Select
                                                       id="location"
                                                       data-size="5"
                                                       title="Select Experience"
                                                       value={jobsData.location}
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       <option>--- Choose Location ---</option>
                                                       <option value="Delhi">Delhi</option>
                                                       <option value="Noida">Noida</option>
                                                       <option value="Gurugam">Gurugam</option>
                                                       <option value="Faridabad">Faridabad</option>
                                                       <option value="Ghaziabad">Ghaziabad</option>
                                                  </Form.Select>
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col}>
                                                  <Form.Label>State</Form.Label>
                                                  <Form.Select
                                                       id="state"
                                                       data-size="5"
                                                       title="Select Experience"
                                                       value={jobsData.state}
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       <option>--- Choose State ---</option>
                                                       <option value="Delhi">Delhi</option>
                                                       <option value="Noida">Noida</option>
                                                       <option value="Gurugam">Gurugam</option>
                                                       <option value="Faridabad">Faridabad</option>
                                                       <option value="Ghaziabad">Ghaziabad</option>
                                                  </Form.Select>
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Company Name/Hiring for</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="company_name"
                                                       className="utf-with-border "
                                                       placeholder="Company Name/Hiring for"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.company_name}
                                                  />
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Role & Responsibities</Form.Label><br></br>
                                                  <textarea
                                                       cols="30"
                                                       rows="2"
                                                       id="role_responsliblity"
                                                       className="utf-with-border"
                                                       placeholder="Role & Responsibities"
                                                       style={{width:"100%", fontSize:"14px" }}
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.role_responsliblity}
                                                  ></textarea>
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Application Alert</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="application_alert"
                                                       className="utf-with-border"
                                                       placeholder="shyam.cogent@gmail.com"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.application_alert}
                                                  />
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col} >
                                                  <Form.Label>Interviewer Name</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="interviewer_name"
                                                       className="utf-with-border"
                                                       placeholder="Interviewer Name"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.interviewer_name}
                                                  />
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Contact No</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="contact_no"
                                                       className="utf-with-border"
                                                       placeholder="Contact No"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.contact_no}
                                                  />
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Interview Type</Form.Label>
                                                  <Form.Select
                                                       id="interview_type"
                                                       data-size="3"
                                                       title="Interview Type"
                                                       value={jobsData.interview_type}
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       <option>--- Choose Interview Type ---</option>
                                                       <option value="Walkin">Walkin</option>
                                                       <option value="Schedule">Schedule</option>
                                                       <option value="Online">Online</option>
                                                  </Form.Select>
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Interview Day</Form.Label>
                                                  <Form.Select
                                                       id="interview_day"
                                                       value={jobsData.interview_day}
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       <option>--- Choose Interview Day ---</option>
                                                       <option value="Monday">Monday</option>
                                                       <option value="Tuesday">Tuesday</option>
                                                       <option value="Wednesday">Wednesday</option>
                                                       <option value="Thursday">Thursday</option>
                                                       <option value="Friday">Friday</option>
                                                       <option value="Saturday">Saturday</option>
                                                  </Form.Select>
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3 ">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Interview Timming</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="interview_time"
                                                       className="utf-with-border"
                                                       placeholder="11am - 5pm"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.interview_time}
                                                  />
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Contact View to Interview</Form.Label>
                                                  <Form.Select
                                                       id="contact_view"
                                                       data-size="2"
                                                       title="Interview Day"
                                                       value={jobsData.contact_view}
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       <option>--- Choose Contact View  ---</option>
                                                       <option value="Yes">Yes</option>
                                                       <option value="No">No</option>
                                                  </Form.Select>
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Google Location link</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="google_location"
                                                       className="utf-with-border"
                                                       placeholder="https://"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.google_location}
                                                  />
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Interview Address</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="interview_address"
                                                       className="utf-with-border"
                                                       placeholder="Delhi"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.interview_address}
                                                  />
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group as={Col}>
                                                  <Form.Label>Reminder</Form.Label>
                                                  <input
                                                       type="text"
                                                       id="reminder"
                                                       className="utf-with-border"
                                                       placeholder="Reminder"
                                                       onChange={(e) => handleChange(e)}
                                                       value={jobsData.reminder}
                                                  />
                                             </Form.Group>
                                             <Form.Group as={Col}>
                                                  <Form.Label>Paid response</Form.Label>
                                                  <Form.Select
                                                       id="paid_response"
                                                       value={jobsData.paid_response}
                                                       onChange={(e) => handleChange(e)}
                                                  >
                                                       <option>--- Choose Paid Response  ---</option>
                                                       <option value="Yes">Yes</option>
                                                       <option value="No">No</option>
                                                  </Form.Select>
                                             </Form.Group>
                                        </Row>
                                        <div className="utf-centered-button mt-2 mb-5">
                                             <Button variant="primary" type="submit" style={{fontSize:"14px"}}>
                                                  Update Job Posting
                                             </Button>
                                        </div>
                                   </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     )
}
export default Update_Job_Posting;