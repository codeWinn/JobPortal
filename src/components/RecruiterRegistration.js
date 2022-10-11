import React from "react";
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import Datatable6 from '../Datatable/Datatable6';
import { IoIosArrowForward } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";


function RecruiterRegistration() {
    return (
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Recruiter Registration</h4>
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
                                    Recruiter Registration</li>
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
                            <div className="body">
                                <Datatable6 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default RecruiterRegistration