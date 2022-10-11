import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from 'react-icons/fa';
import { AiOutlineWallet } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillStar, AiFillEdit } from 'react-icons/ai';
import axios from "axios";
import { FaRegTrashAlt } from 'react-icons/fa';



const JobPostCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setdata] = useState([]);

    const fetch = () => {
        axios.get(`/job_posting/view/${id}`,{id:id}).then((res) => {
          console.log(res)
            setdata(res.data.result);
        })

    }

    useEffect(() => {
        fetch()
    }, [])

    function handleDelete(id) {
        axios.get("job_posting/delete/" + id, { id: id }).then(
          (result) => {
            console.log(result.items);
          }
        );
        alert("Delete Successfully");
        fetch();
        navigate('/jobPosts');
    
      }

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Job Post Card</h4>
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
                                    Job Post Card
                                </li>
                            </ul>
                        </div>
                        <div className="utf-dashboard-content-inner-aera">
                            <div className="row">
                                <div className="col-xl-12">
                                    <section className="jd-header" >
                                        <div className="top">
                                            <div className="jd-top-head">
                                                <header><h1 className="jd-header-title" title="Mega BPO Hiring Voice Process -Tech Mahindra / Remote-  Work From Home">Job Details : </h1>
                                                </header>
                                                <div >
                                                    <Link style={{ color: "green", fontSize:"14px", }} className="box-sha" to={"/Update_Job_Posting/" + data.id}>Edit</Link>

                                                    <span onClick={() => handleDelete(data.id)} className="box-sha" style={{ color: "red", fontSize: "14px", marginLeft:"10px",cursor:"pointer"}} >Delete</span>
                                                </div>
                                            </div>
                                            <div className=" custom-hi d-flex">
                                                <div>
                                                <p>ID</p>
                                                <p>Company name</p>
                                                {/* <p>Name</p> */}
                                                <p>Department</p>
                                                <p>Designation</p>
                                                <p>Total_experience</p>
                                                <p>Qualifications</p>
                                                <p>Salary</p>
                                                </div>
                                                <div className="ml-5">
                                                    <p>:</p>
                                                    <p>:</p>
                                                    {/* <p>:</p> */}
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                </div>
                                                <div className="ml-5">
                                                <p><small>{data.id} </small></p>
                                                <p><small>{data.company_name}</small></p>
                                                {/* <p><small>{data.name}</small></p> */}
                                                <p><small>{data.category_name}</small></p>
                                                <p><small>{data.designation_name}</small></p>
                                                <p><small>{data.experience}</small></p>
                                                <p><small>{data.high_qualification}</small></p>
                                                <p><small>{data.expected_salary}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="job-desc jd-header">
                                        <h2>Job description</h2>
                                        <div className="dang-inner-html">
                                            <p>
                                                <strong className="jb-strong">
                                                    {data.role_responsliblity}
                                                </strong>
                                            </p>
                                        </div>
                                        <div className="other-details">
                                            <div className="details">
                                                <label>Role</label><span>Front End Developer<span className="comma">,</span></span>
                                            </div>
                                            <div className="details">
                                                <label>Industry Type</label><span>IT Services &amp; Consulting<span className="comma">,</span></span>
                                            </div>
                                            <div className="details">
                                                <label>Functional Area</label><span>Engineering - Software<span className="comma">,</span></span>
                                            </div>
                                            <div className="details">
                                                <label>Employment Type</label><span><span>Full Time, Permanent</span></span>
                                            </div>
                                            <div className="details">
                                                <label>Role Category</label><span><span>Software Development</span></span>
                                            </div>
                                        </div>
                                        <div className="education">
                                            <div className="heading">Education</div>
                                            <div className="details"><label>UG :</label><span className="">Any Graduate</span></div>
                                            <div className="details"><label>PG :</label><span className="">Any Postgraduate</span></div>
                                        </div>
                                        <div className="key-skill">
                                            <div className="heading">Key Skills</div>
                                            <div>
                                                <a target="_blank" className="chip non-clickable"><span>Oracle Revenue Management Billing</span></a>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JobPostCard;

