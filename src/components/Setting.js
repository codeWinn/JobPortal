import React from "react";
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import Datatable10 from '../Datatable/Datatable10';
import { IoIosArrowForward } from "react-icons/io";

function Setting() {
  return (
    <section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <ul className="breadcrumb breadcrumb-style ">
                        <li className="breadcrumb-item">
                            <h4 className="page-title">Setting</h4>
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
                            Setting
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}
export default Setting;