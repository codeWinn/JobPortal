import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, aside } from 'react-bootstrap/Button';
import reactDom from "react-dom";
import userImage from '../images/Users/usrbig.jpg';
import { RiWalletFill } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { AiFillIdcard, AiOutlineComment, AiFillSetting } from "react-icons/ai";
import { FaBriefcase, FaMoneyCheck, FaAccessibleIcon, FaUserCheck, FaQuora } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { GiArchiveRegister } from "react-icons/gi";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";


const Sidebar2 = () => {
  return (
    <>
      <aside id="leftsidebar" className="sidebar width-new">
        <div className="menu">
          <ul className="list">
            <li className="active">
              <Link className="nav-link" to="/Dashboard">      
                  <MdOutlineDashboard className="FontIcons" />
              </Link>
            </li>
            <li>
            <Link className="nav-link" to="/planandwallet">      
                <RiWalletFill className="FontIcons" />
             </Link>
            </li>
            {/* <li>
            <Link className="nav-link" to="/jobPosts">    
                <AiFillIdcard className="FontIcons" />
            </Link>
            </li> */}
            <li>
            
            <Link className="nav-link" to="/jobPostsManager">
                <FaBriefcase className="FontIcons" />
                </Link>
            </li>
            <li>
            <Link className="nav-link" to="/recruiterregistration">
                <FaMoneyCheck className="FontIcons" />
            </Link>
            </li>
            <li>
            <Link className="nav-link" to="/candidateregistration">
                <GiArchiveRegister className="FontIcons" />
        
             </Link>
            </li>
            <li>
            <Link className="nav-link" to="/candidateinterviewfeedback">
                <GoCommentDiscussion className="FontIcons" />
            </Link>
            </li>
            <li>
            <Link className="nav-link" to="/traningapproval">
                <FaAccessibleIcon className="FontIcons" />
              </Link>
            </li>
            <li>
            <Link className="nav-link" to="/EmployeeBackgroundVerification">
                <FaUserCheck className="FontIcons" />
              </Link>
            </li>
            <li>
            <Link className="nav-link" to="/Setting">
                <AiFillSetting className="FontIcons" />
            </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Email_Whatsapp_setup">
              <BsFillCreditCard2FrontFill className="FontIcons" />
              </Link>
            </li>
            <li>
            <Link className="nav-link" to="/AffiliateRefferalandPayment">
                <BsFillCreditCard2FrontFill className="FontIcons" />
              </Link>
            </li>
            <li>
            <Link className="nav-link" to="/Querry">
                <FaQuora className="FontIcons" />
            </Link>
            </li>
            <li>
            <Link className="nav-link" to="/auto_invoicing_plan">
                <FaQuora className="FontIcons" />
            </Link>
            </li>
          </ul>
        </div>
        {/* <!-- #Menu --> */}
      </aside>
      {/* <!-- #END# Left Sidebar --> */}      
    </>
  );
};
export default Sidebar2;