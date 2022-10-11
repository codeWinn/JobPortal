import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import "@fontsource/roboto";
import "./App.css";
import Swal from 'sweetalert2';
import PlanAndWallet from "./components/PlanAndWallet";
import { Routes, Route, Navigate } from "react-router-dom";
import JobPosts from "./components/JobPosts";
import JobPostsManager from "./components/JobPostsManager";
import RecruiterRegistration from "./components/RecruiterRegistration";
import CandidateRegistration from "./components/CandidateRegistration";
import CandidateInterviewFeedback from "./components/CandidateInterviewFeedback";
import TraningApproval from "./components/TraningApproval";
import EmployeeBackgroundVerification from "./components/EmployeeBackgroundVerification";
import Setting from "./components/Setting";
import AffiliateRefferalandPayment from "./components/AffiliateRefferalandPayment";
import Querry from "./components/Querry";
import List_Category from "./components/View_Category";
import Add_Categorylist from "./components/Add_Category";
import Update_Category from "./components/Update_Category";
import View_Industry from "./components/View_Industry";
import Add_Industry from "./components/Add_Industry";
import Add_Employee from "./components/Add_Employee";
import Update_Employee from "./components/Update_Employee";
import Update_Industry from "./components/Update_Industry";
import View_Designation from "./components/View_Designation";
import Add_Designation from "./components/Add_Designation";
import Update_Designation from "./components/Update_Designation";
import LoginMobileNumber from "./components/LoginMobileNumber";
import OtpScreen from "./components/OtpScreen";
import View_Recruiter from "./components/View_Recruiter";
import Add_Job_Posting from "./components/Add_Job_Posting";
import Update_Job_Posting from "./components/Update_Job_Posting";
import View_Age from "./components/View_Age";
import Add_Age from "./components/Add_Age";
import Update_Age from "./components/Update_Age";
import View_Qualification from "./components/View_Qualification";
import Add_Qualification from "./components/Add_Qualification";
import Update_Qualification from "./components/Update_Qualification";
import View_Current_Salary from "./components/View_Current_Salary";
import Update_Current_Salary from "./components/Update_Current_Salary";
import Add_Current_Salary from "./components/Add_Current_Salary";
import View_Expected_Salary from "./components/View_Expected_Salary";
import Update_Expected_Salary from "./components/Update_Expected_Salary";
import Add_Expected_Salary from "./components/Add_Expected_Salary";
import ViewGender from "./components/view_gender";
import AddGender from "./components/Add_Gender";
import UpdateGender from "./components/Update_Gender";
import PreferredLocation from "./components/PreferredLocation";
import Add_PreferredLocation from "./components/Add_PreferredLocation";
import UpdateLocation from "./components/UpdateLocation";
import ViewNotice from "./components/ViewNotice";
import AddNotice from "./components/AddNotice";
import UpdateNotice from "./components/UpdateNotice";
import View_Total_Experience from "./components/View_Total_Experience";
import Update_Total_Experience from "./components/Update_Total_Experience";
import Add_Total_Experience from "./components/Add_Total_Experience";
import Profile from "./components/Profile";
import ViewAll from "./components/View_All";
import JobPostCard from './components/jobPostCard';
import Email_Whatsapp_setup from "./components/Email_Whatsapp_setup";
import Auto_invoicing_plan from "./components/Auto_invoicing_plan";
import View_Employee from "./components/View_Employee";

axios.defaults.baseURL = "https://holowash.in/apicogent";
function App() {

  const [isLogined, setIsLogined] = useState(localStorage.getItem('auth_token'));
  console.log("loggedin", isLogined);
  console.log("mobile no", localStorage.getItem('auth_mobile'));
  const setTokens = (data) => {
    setIsLogined(data);
  }

  const logoutSubmit = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_mobile');
    setIsLogined();
    Swal.fire('Logout Succefully');

  }

  return (
    <>
      {!isLogined ? (
        <>
          <Routes value={{ setIsLogined: setTokens }}>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<LoginMobileNumber />} />
            <Route path="/OtpScreen" element={<OtpScreen />} />
          </Routes>
        </>
      ) : (
        <>
          <Header remove={logoutSubmit} />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/viewall/:id" element={<ViewAll />} />
            <Route path="/jobpostcard/:id" element={<JobPostCard />} />
            <Route path="/View_Total_Experience" element={<View_Total_Experience />} />
            <Route path="/Update_Total_Experience/:id" element={<Update_Total_Experience />} />
            <Route path="/Add_Total_Experience" element={<Add_Total_Experience />} />
            <Route path="/viewGender" element={<ViewGender />} />
            <Route path="/Add_Gender" element={<AddGender />} />
            <Route path="/Update_Gender/:id" element={<UpdateGender />} />
            <Route path="/PreferredLocation" element={<PreferredLocation />} />
            <Route path="/Add_PreferredLocation" element={<Add_PreferredLocation />} />
            <Route path="/Updatelocation/:id" element={<UpdateLocation />} />
            <Route path="/Viewnotice" element={<ViewNotice />} />
            <Route path="/Add_Notice" element={<AddNotice />} />
            <Route path="/UpdateNotice/:id" element={<UpdateNotice />} />
            <Route path="/Add_Expected_Salary" element={<Add_Expected_Salary />} />
            <Route path="/Update_Expected_Salary/:id" element={<Update_Expected_Salary />} />
            <Route path="/View_Expected_Salary" element={<View_Expected_Salary />} />
            <Route path="/Update_Current_Salary/:id" element={<Update_Current_Salary />} />
            <Route path="/Add_Current_Salary" element={<Add_Current_Salary />} />
            <Route path="/View_Current_Salary" element={<View_Current_Salary />} />
            <Route path="/Add_Qualification" element={<Add_Qualification />} />
            <Route path="/View_Qualification" element={<View_Qualification />} />
            <Route path="/Update_Qualification/:id" element={<Update_Qualification />} />
            <Route path="/View_Age" element={<View_Age />} />
            <Route path="/Add_Age" element={<Add_Age />} />
            <Route path="/Update_Age/:id" element={<Update_Age />} />
            <Route path="/Update_Job_Posting/:id" element={<Update_Job_Posting />} />
            <Route path="/Add_Job_Posting" element={<Add_Job_Posting />} />
            <Route path="/View_Recruiter" element={<View_Recruiter />} />
            <Route path="/Update_Designation/:id" element={<Update_Designation />} />
            <Route path="/Add_Designation" element={<Add_Designation />} />
            <Route path="/View_Designation" element={<View_Designation />} />
            <Route path="/Update_Employee/:id" element={<Update_Employee />} />
            <Route path="/Add_Employee" element={<Add_Employee />} />
            <Route path="/View_Employee" element={<View_Employee />} />
            <Route path="/View_Industry" element={<View_Industry />} />
            <Route path="/Update_Industry/:id" element={<Update_Industry />} />
            <Route path="/Add_Industry" element={<Add_Industry />} />
            <Route path="/Update_Category/:id" element={<Update_Category />} />
            <Route path="/Add_Categorylist" element={<Add_Categorylist />} />
            <Route path="/List_Category" element={<List_Category />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/planandwallet" element={<PlanAndWallet />} />
            <Route path="/jobPosts" element={<JobPosts />} />
            <Route path="/jobPostsManager" element={<JobPostsManager />} />
            <Route
              path="/recruiterregistration"
              element={<RecruiterRegistration />}
            />
            <Route
              path="/candidateregistration"
              element={<CandidateRegistration />}
            />
            <Route
              path="/candidateinterviewfeedback"
              element={<CandidateInterviewFeedback />}
            />
            <Route path="/traningapproval" element={<TraningApproval />} />
            <Route
              path="/EmployeeBackgroundVerification"
              element={<EmployeeBackgroundVerification />}
            />
            <Route path="/Setting" element={<Setting />} />

            <Route path="/Email_Whatsapp_setup" element={<Email_Whatsapp_setup/>}
            />
            <Route
              path="/AffiliateRefferalandPayment"
              element={<AffiliateRefferalandPayment />}
            />
            <Route path="/Querry" element={<Querry />} />
            <Route
              path="/auto_invoicing_plan"
              element={<Auto_invoicing_plan/>}
            />
          </Routes>
        </>
      )
      }
    </>
  );
}

export default App;
