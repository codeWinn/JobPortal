import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks} from "react-icons/fa";
import { MdPayment,MdQuestionAnswer } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowUp } from "react-icons/ai";
 import Datatable from "../Datatable/Datatable";
 import axios from "axios";
 import CountUp from 'react-countup'
 
// import { Datatable } from  'react-datatable-search-pagination';

function Dashboard(){

    // const [data, setData] = useState([]);
    // const navigate = useNavigate();
    
    // const fetchData = () => {
    //     Axios.get("job_category/view_job")
    //         .then((response) => {
    //             console.log(response.data.result)
    //             setData(response.data.result);
    //         }
    //         )
    // }
    
    const [employee, setEmployee]= useState([])
    const fetchData = () => {
        axios.get("/totalemployee/view_employee")
             .then((response) => {
                  console.log(response.data.result);
                  setEmployee(response.data.result)
             });
   }
   
    return (
        <>
            
            {/* Main Content Box Start */}
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <ul className="breadcrumb breadcrumb-style ">
                                    <li className="breadcrumb-item">
                                        <h4 className="page-title">Dashboard</h4>
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
                                        Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xl-3 col-sm-6">
                            <div className="card l-bg-purple">
                                <div className="info-box-5 p-4">
                                    <div className="card-icon card-icon-large">
                                        <FaRegWindowRestore className="cardIcon" />

                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-20 mb-0">Months</h5>
                                    </div>
                                    <div className="row align-items-center mb-2 d-flex">
                                        <div className="col-8">
                                        <h2  className="d-flex align-items-center mb-0">
                                               <CountUp
                                                end= {15}
                                                duration={3}
                                               /> 
                                            </h2>
                                        </div>
                                        <div className="col-4 text-end">
                                            <span className="fw-bold">
                                            <CountUp
                                                end= {24.7}
                                                duration={3}
                                               />%
                                                <AiOutlineArrowUp className="topArrow" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress mt-1 " data-height="8">
                                        <div className="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progressbar" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6">
                            <div className="card l-bg-blue-dark">
                                <div className="info-box-5 p-4">
                                    <div className="card-icon card-icon-large">
                                        <FaUsers className="cardIcon" />
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-20 mb-0">Active Recuriter</h5>
                                    </div>
                                    <div className="row align-items-center mb-2 d-flex">
                                        <div className="col-8">
                                            <h2  className="d-flex align-items-center mb-0" id="demo">
                                            <CountUp
                                                end= {255}
                                                duration={3}
                                               />
                                            </h2>    
                                        </div>
                                        <div className="col-4 text-end">
                                            <span> <CountUp
                                                end= {20}
                                                duration={3}
                                               />%
                                                <AiOutlineArrowUp className="topArrow" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress mt-1 " data-height="8">
                                        <div  className="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6">
                            <div className="card l-bg-green-dark">
                                <div className="info-box-5 p-4">
                                    <div className="card-icon card-icon-large">
                                        <FaTasks className="cardIcon" />
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-20 mb-0">Inactive Recuriter</h5>
                                    </div>
                                    <div className="row align-items-center mb-2 d-flex">
                                        <div className="col-8">
                                                <h2  className="d-flex align-items-center mb-0">
                                                <CountUp
                                                end= {1550}
                                                duration={3}
                                               />
                                            </h2>    
                                        </div>
                                        <div className="col-4 text-end">
                                            <span> <CountUp
                                                end= {36}
                                                duration={3}
                                               />%
                                                <AiOutlineArrowUp className="topArrow" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress mt-1 " data-height="8" >
                                        <div className="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"  >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6">
                            <div className="card l-bg-orange-dark">
                                <div className="info-box-5 p-4">
                                    <div className="card-icon card-icon-large">
                                        <FaMoneyCheck className="cardIcon" />
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-20 mb-0">Recruiter Payment</h5>
                                    </div>
                                    <div className="row align-items-center mb-2 d-flex">
                                        <div className="col-8">
                                            <h2  className="d-flex align-items-center mb-0">
                                                 ₹
                                                <CountUp
                                                end= {2658}
                                                duration={3}
                                               />
                                            </h2>  
                                        </div>
                                        <div className="col-4 text-end">
                                            <span><CountUp
                                                end= {5.07}
                                                duration={3}
                                               />%
                                                <AiOutlineArrowUp className="topArrow" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress mt-1 " data-height="8">
                                        <div  className="progress-bar l-bg-cyan" role="progressbar" data-width="45%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6">
                            <div className="card bg-brown bg-darken-sm">
                                <div className="info-box-5 p-4">
                                    <div className="card-icon card-icon-large">
                                        <MdPayment className="cardIcon"/>
                                        
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-20 mb-0">Training Payment</h5>
                                    </div>
                                    <div className="row align-items-center mb-2 d-flex">
                                        <div className="col-8">  
                                                <h2  className="d-flex align-items-center mb-0">
                                                <CountUp
                                                end= {1558}
                                                duration={3}
                                               />
                                            </h2>    
                                        </div>
                                        <div className="col-4 text-end">
                                            <span><CountUp
                                                end= {36}
                                                duration={3}
                                               />%
                                                <AiOutlineArrowUp className="topArrow" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress mt-1 " data-height="8" >
                                        <div className="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="col-xl-3 col-lg-6">
                            <div className="card bg-cyan bg-darken-lg">
                                <div className="info-box-5 p-4">
                                    <div className="card-icon card-icon-large">
                                        <MdQuestionAnswer className="cardIcon" />
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-20 mb-0">Interview Question </h5>
                                    </div>
                                    <div className="row align-items-center mb-2 d-flex">
                                        <div className="col-8"> 
                                                <h2  className="d-flex align-items-center mb-0">
                                                <CountUp
                                                end= {1658}
                                                duration={3}
                                               />
                                            </h2>  
                                        </div>
                                        
                                        <div className="col-4 text-end">
                                            <span><CountUp
                                                end= {16}
                                                duration={3}
                                               />%
                                                <AiOutlineArrowUp className="topArrow" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress mt-1 " data-height="8" >
                                        <div className="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        {/* <strong>Products</strong> Chart */}
                                    </h2>
                                </div>
                                <div className="body">
                                    <div className="recent-report__chart"> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        {/* <strong>Profit</strong> Chart */}
                                    </h2>
                                </div>
                                <div className="body">
                                    <div className="recent-report__chart"> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* datatables */}

                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="header">
                                    <ul class="header-dropdown m-r--5">
                                        <li class="dropdown">
                                            <a href="#" onClick="return false;" class="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                <i class="material-icons"></i>
                                            </a>
                                            <ul class="dropdown-menu pull-right">
                                                <li>
                                                    <a href="#" onClick="return false;">Action</a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick="return false;">Another action</a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick="return false;">Something else here</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="body">
                                    <div class="table-responsive">
                                         {/* <Datatable />  */}
                                        {/* <Datatable
                                        tableHead={mytableHead}
                                        dataSrc={mydataSrc}
                                    /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="header">
                                    {/* <h2>Chart 1</h2> */}
                                    <ul class="header-dropdown m-r--5">
                                        <li class="dropdown">
                                            <a href="#" onClick="return false;" class="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                <i class="material-icons"></i>
                                            </a>
                                            <ul class="dropdown-menu pull-right">
                                                <li>
                                                    <a href="#" onClick="return false;">Action</a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick="return false;">Another action</a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick="return false;">Something else here</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="body"> 
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="header">
                                    {/* <h2>Chart 2</h2> */}
                                </div>
                                <div className="body">
                                    <div id="echart_area_line" className="chartsh"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="header">
                                    {/* <h2>Chart 3</h2> */}
                                </div>
                                <div className="body">
                                    <div id="echart_bar" className="chartsh"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Main Content Box End */}
        </>
    );
};

export default Dashboard;