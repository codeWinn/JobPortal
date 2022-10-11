import React from "react";
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import Datatable2 from '../Datatable/Datatable2';
import Datatable3 from '../Datatable/Datatable3';
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowUp } from "react-icons/ai";
import {BiDotsVerticalRounded} from "react-icons/bi";




const PlanAndWallet = () =>{
    return(
        <section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul className="breadcrumb breadcrumb-style ">
                                    <li className="breadcrumb-item">
                                        <h4 className="page-title">Plan & Wallet</h4>
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
                                        Plan & Wallet</li>
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
                    <Datatable2/>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Second Table start --> */}
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card">
                    <div class="header">
                        <ul class="header-dropdown m-r--5">
                            <li class="dropdown">
                                <Link to="javascript:void(0);" class="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
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
                        <div class="table-responsive">
                            {/* <Datatable3/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Second Table End --> */}
    </div>
</section>
    )
}
export default PlanAndWallet;