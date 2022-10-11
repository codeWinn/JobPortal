import React,{useState} from "react";
import logo from "../images/Logo/LOGO01.png"
import { FiMenu } from "react-icons/fi";
import { FaExpand, FaRegBell } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import user from "../images/Users/user.jpg"
import { Link, Navigate } from "react-router-dom";
import SideBar from './SideBar';
import Sidebar2 from './Sidebar2';
import {CgProfile} from 'react-icons/cg';
import {VscFeedback} from 'react-icons/vsc';
import {FiLogOut} from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const Header = (props) => {
const[val,setval] = useState(true)
const navigate = useNavigate();

const id = localStorage.getItem('auth_token');
const removetoken = () =>{
    props.remove();
    navigate('/');

}
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="nav-link" to="">
                            <img src={logo} alt="" />
                            <span className="logo-name">Cogent Jobs</span>
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="pull-left">
                                <FiMenu  className="MenuStyle" onClick={()=>{setval(!val)}}/>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {/* <!-- Full Screen Button --> */}
                            <li className="fullscreen">
                                <Link className="nav-link" to="">
                                    <FaExpand className="fullmenu" />
                                </Link>
                            </li>
                            {/* <!-- #END# Full Screen Button --> */}


                            {/* <!-- #START# Notifications--> */}
                            <li className="dropdown">
                                <Link className="nav-link" to="">

                                    <FaRegBell className="fullmenu" />
                                    <span className="notify"></span>
                                    <span className="heartbeat"></span>
                                </Link>
                                <ul className="dropdown-menu pullDown">
                                    <li className="header">NOTIFICATIONS</li>
                                    <li className="body">
                                        <ul className="menu">
                                            <li>
                                                <Link className="nav-link" to="">
                                                    <span className="table-img msg-user">
                                                        <img src={user} alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Riya</span>
                                                        <span className="menu-desc">
                                                            <i className="material-icons">access_time</i> 14 mins ago
                                                        </span>
                                                        <span className="menu-desc">Please check your email.</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="">
                                                    <span className="table-img msg-user">
                                                        <img src={user} alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Kajal Singh</span>
                                                        <span className="menu-desc">
                                                            <i className="material-icons">access_time</i> 22 mins ago
                                                        </span>
                                                        <span className="menu-desc">Please check your email.</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="">
                                                    <span className="table-img msg-user">
                                                        <img src={user} alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Priya Kumari</span>
                                                        <span className="menu-desc">
                                                            <i className="material-icons">access_time</i> 3 hours ago
                                                        </span>
                                                        <span className="menu-desc">Please check your email.</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="">
                                                    <span className="table-img msg-user">
                                                        {/* <img src="assets/images/user/user4.jpg" alt="" /> */}
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Heena</span>
                                                        <span className="menu-desc">
                                                            <i className="material-icons">access_time</i> 2 hours ago
                                                        </span>
                                                        <span className="menu-desc">Please check your email.</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="">
                                                    <span className="table-img msg-user">
                                                        {/* <img src="assets/images/user/user5.jpg" alt="" /> */}
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Rani</span>
                                                        <span className="menu-desc">
                                                            <i className="material-icons">access_time</i> 4 hours ago
                                                        </span>
                                                        <span className="menu-desc">Please check your email.</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="">
                                                    <span className="table-img msg-user">
                                                        {/* <img src="assets/images/user/user6.jpg" alt="" /> */}
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Rohit Kumar</span>
                                                        <span className="menu-desc">
                                                            <i className="material-icons">access_time</i> 3 hours ago
                                                        </span>
                                                        <span className="menu-desc">Please check your email.</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="">
                                                    <span className="table-img msg-user">
                                                        {/* <img src="assets/images/user/user7.jpg" alt="" /> */}
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Chandni perween</span>
                                                        <span className="menu-desc">
                                                            <i className="material-icons">access_time</i> Yesterday
                                                        </span>
                                                        <span className="menu-desc">Please check your email.</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="footer">
                                    <Link className="nav-link" to="">View All Notifications</Link>
                                    </li>
                                </ul>
                            </li>
                            {/* <!-- #END# Notifications--> */}
                            <li className="dropdown user_profile">
                                <div className="dropdown-toggle" data-bs-toggle="dropdown">
                                    <img src={user} alt="user" />
                                </div>
                                <ul className="dropdown-menu pullDown">
                                    <li className="body">
                                        <ul className="user_dw_menu newStyle">
                                            <li>
                                            <Link className="nav-link" to={"/Profile/" + id}>
                                            <CgProfile className="FontIcons new"/>Profile
                                                </Link>
                                            </li>
                                            <li>
                                            <Link className="nav-link" to="">
                                            <VscFeedback className="FontIcons new"/>Feedback
                                                </Link>
                                            </li>

                                            <li>
                                            <button className="nav-link" onClick={removetoken}>
                                            <FiLogOut className="FontIcons new" />Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            {/* <!-- #END# Tasks --> */}
                            
                        </ul>
                    </div>
                </div>
            </nav>
           {val?<SideBar/>:<Sidebar2/> }
        </>

    );
};
export default Header;