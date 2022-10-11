
import React from "react";
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import Datatable5 from '../Datatable/Datatable5';
import { IoIosArrowForward } from "react-icons/io";
import {BiDotsVerticalRounded} from 'react-icons/bi';

function JobPostsManager() {
  return (
    <section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul className="breadcrumb breadcrumb-style ">
                                    <li className="breadcrumb-item">
                                        <h4 className="page-title">Job Posting Manager</h4>
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
                                        Job Posting Manager</li>
                                </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card">
                    <div class="header">
                       
                        <ul class="header-dropdown m-r--5">
                            <li class="dropdown">
                                <Link to="javascript:void(0);" class="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                {/* <BiDotsVerticalRounded/> */}
                                </Link>
                                <ul class="dropdown-menu float-end">
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
                    <div class="body">
                        <Datatable5/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default JobPostsManager;