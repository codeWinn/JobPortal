import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Button, aside } from 'react-bootstrap/Button';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import reactDom from "react-dom";
import userImage from '../images/Users/usrbig.jpg';
import { RiWalletFill } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { AiFillIdcard, AiFillSetting, AiFillWallet } from "react-icons/ai";
import { FaBriefcase, FaMoneyCheck, FaAccessibleIcon, FaUserCheck, FaIndustry, FaQuora } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { GiArchiveRegister, GiAges } from "react-icons/gi";
import { FcManager, FcDepartment } from "react-icons/fc";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { GrLocation, GrUserFemale, GrUserExpert } from "react-icons/gr";
import { MdOutlineSpeakerNotes, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiEqualizerFill } from "react-icons/ri";
import $ from 'jquery';


const SideBar = () => {

  return (
    <div id="xyz">
      <aside id="leftsidebar" className="sidebar">
        <div className="menu">
          <ul className="list">
            <li className="sidebar-user-panel active">
              <div className="user-panel">
                <div className=" image">
                  <img src={userImage} className="user-img-style" alt="logo" />
                </div>
              </div>
              <div className="profile-usertitle">
                <div className="sidebar-userpic-name">{localStorage.getItem('auth_name')} </div>
                <div className="profile-usertitle-job "></div>
              </div>
            </li>
            <li className="">
              <Link className="nav-link" to="/Dashboard">
                <MdOutlineDashboard className="FontIcons" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/planandwallet">
                <RiWalletFill className="FontIcons" />
                <span>Plan And Wallet</span>
              </Link>
            </li>
            {/* <li>
              <Link className="nav-link" to="/jobPosts">
                <AiFillIdcard className="FontIcons" />

                <span>Job Posting Category</span>
              </Link>
            </li> */}

            <SubMenu title="Job Posting Category" className="custom-drop" icon={<AiFillIdcard />} suffix={<RiArrowDropDownLine className="flat-cions-2" />}  >
              {/* */}
              <MenuItem><Link className="nav-link" to="/List_Category">
                <FcDepartment className="FontIcons" />
                <span>Department</span>
              </Link></MenuItem>
              <MenuItem><Link className="nav-link" to="/View_Designation">
                <BiCategory className="FontIcons" />
                <span>Designation</span>
              </Link></MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Industry">
                  <FaIndustry className="FontIcons" />
                  <span>Industry</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/PreferredLocation">
                  <GrLocation className="FontIcons" />
                  <span>Preferred Location</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/Viewnotice">
                  <MdOutlineSpeakerNotes className="FontIcons" />
                  <span>Notice</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/viewGender">
                  <GrUserFemale className="FontIcons" />
                  <span>Gender</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Expected_Salary">
                  <AiFillWallet className="FontIcons" />
                  <span>Expected Salary</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Current_Salary">
                  <MdOutlineAccountBalanceWallet className="FontIcons" />
                  <span>Current Salary</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Age">
                  <GiAges className="FontIcons" />
                  <span>Age</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Qualification">
                  <RiEqualizerFill className="FontIcons" />
                  <span>Qualification</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Total_Experience">
                  <GrUserExpert className="FontIcons" />
                  <span>Total Experience</span>
                </Link>
              </MenuItem>
            </SubMenu>

            {/* <SubMenu title="Assests" className="custom-drop" icon={<AiFillIdcard />} suffix={<RiArrowDropDownLine className="flat-cions-2" />}  >
              
              <MenuItem><Link className="nav-link" to="/List_Category">
                <FcDepartment className="FontIcons" />
                <span>Department</span>
              </Link></MenuItem>
              <MenuItem><Link className="nav-link" to="/View_Designation">
                <BiCategory className="FontIcons" />
                <span>Designation</span>
              </Link></MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Industry">
                  <FaIndustry className="FontIcons" />
                  <span>Industry</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/PreferredLocation">
                  <GrLocation className="FontIcons" />
                  <span>Preferred Location</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/Viewnotice">
                  <MdOutlineSpeakerNotes className="FontIcons" />
                  <span>Notice</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/viewGender">
                  <GrUserFemale className="FontIcons" />
                  <span>Gender</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Expected_Salary">
                  <AiFillWallet className="FontIcons" />
                  <span>Expected Salary</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Current_Salary">
                  <MdOutlineAccountBalanceWallet className="FontIcons" />
                  <span>Current Salary</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Age">
                  <GiAges className="FontIcons" />
                  <span>Age</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Qualification">
                  <RiEqualizerFill className="FontIcons" />
                  <span>Qualification</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="nav-link" to="/View_Total_Experience">
                  <GrUserExpert className="FontIcons" />
                  <span>Total Experience</span>
                </Link>
              </MenuItem>
            </SubMenu> */}
            <li>
              <Link className="nav-link" to="/View_Employee">
                <FcManager className="FontIcons" />
                <span>Employee</span>
              </Link>
            </li>
            {/* <li>
              <Link className="nav-link" to="/jobPostsManager">
                <FaBriefcase className="FontIcons" />
                <span>Job Posting Manage</span>
              </Link>
            </li> */}
            <li>
              <Link className="nav-link" to="/recruiterregistration">
                <FaMoneyCheck className="FontIcons" />
                <span>Recruiter Registration</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/candidateregistration">
                <GiArchiveRegister className="FontIcons" />
                <span>Candidate Registration</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/candidateinterviewfeedback">
                <GoCommentDiscussion className="FontIcons" />
                <span>Condidate Interview Feedback</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/traningapproval">
                <FaAccessibleIcon className="FontIcons" />
                <span>Training Approval</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/EmployeeBackgroundVerification">
                <FaUserCheck className="FontIcons" />
                <span>Employee Background Verification</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Email_Whatsapp_setup">
                <MdOutlineSpeakerNotes  className="FontIcons" />
                <span>Email & Whatsapp setup</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Setting">
                <AiFillSetting className="FontIcons" />
                <span>setting</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/AffiliateRefferalandPayment">
                <BsFillCreditCard2FrontFill className="FontIcons" />
                <span>Affiliate Refferal and Payment</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Querry">
                <FaQuora className="FontIcons" />
                <span>Queries</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/auto_invoicing_plan">
              <FaQuora className="FontIcons" />
                <span>Auto Invoicing for Plan buy</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* <!-- #Menu --> */}
      </aside>
      {/* <!-- #END# Left Sidebar --> */}
    </div>
  );
};
export default SideBar;