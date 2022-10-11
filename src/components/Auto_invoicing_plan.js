import React from 'react';
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Auto_invoicing_plan = () => {
  return (
    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ul className="breadcrumb breadcrumb-style ">
                            <li className="breadcrumb-item">
                                <h4 className="page-title">Email/Whatsapp setup</h4>
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
                                Email/Whatsapp setup
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <h1>Hello world</h1>
                        </div>
                    </div>
                </div>
        </div>
    </section>
  )
}

export default Auto_invoicing_plan;
