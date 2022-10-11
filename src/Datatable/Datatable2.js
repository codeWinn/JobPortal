import React,{useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
// import { AiFillDelete, AiFillEdit } from "react-icons/ai";
// import Switch from '@mui/material/Switch';
import axios from 'axios';


export default function Datatable2() {

  const [employee, setEmployee] = useState([]);
  const fetchData = () => {
    axios.get("/View_Employee").then((res) => {
      setEmployee(res.data.result);
      console.log(res.data.result);
    })
  }
  

  useEffect(() => {
    fetchData();
  }, []);

  
  // function Add_Employee() {
  //   const navigate = useNavigate();
    
  //   const [employee, setEmployee] = useState({
  //     name: "",
  //     contact_no: "",
  //     email: "",
  //     local_address: "",
  //     permanent_address: "",
  //     pincode: "",
  //   });
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     await axios
  //     .post("employee/add", {
  //       name: employee.name,
  //       contact_no: employee.contact_no,
  //       email: employee.email,
  //       local_address: employee.local_address,
  //       permanent_address: employee.permanent_address,
  //       pincode: employee.pincode,
        
  //     })
  //     .then((res) => {
  //       alert("Form Submitted Successfully");
  //       console.log(res);
  //       navigate("/View_Employee")
  //     });
  // };
  //     function handleChange(e) {
  //       const newdata = { ...employee };
  //       newdata[e.target.id] = e.target.value;
  //       setEmployee(newdata);
  //       console.log(newdata);
  //     }

  return(
    <div className='table-responsive'>
      <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>ID</th>
                <th> Plan</th>
                <th>Min Recharge</th>
                <th>Emailer</th>
                <th>SMS</th>
                <th>Contact</th>
                <th>Job posting</th>
                <th>Inquiry</th>
                <th>Verification</th>
                <th>Tracking</th>
                <th colSpan={2}>Action</th>
            </tr>
        </thead>
        <tbody className='table-col'>
            {employee.map((items) => (
                  <tr key= {items.id}> 
                      <td>{items.sn}</td>
                      <td>{items.recharge}</td>
                      <td>{items.emeral_rate}</td>
                      <td>{items.sms_rate}</td>
                      <td>{items.candidate_contact_view_rate}</td>
                      <td>{items.job_posting_rate}</td>
                      <td>{items.inquirey_recived_rate}</td>
                      <td>{items.emp_verification_rate}</td>
                      <td>{items.candidate_traking}</td>
                      {/* <td style={{ borderStyle: "none" }}>
                         <Link style={{ color: "green" }} to={"/Update_Category/" + user.id}><AiFillEdit /></Link>
                      </td>
                      <td style={{ borderStyle: "none" }}>
                          <button className="" style={{ color: "red" }} onClick={() => handleDelete(user.id)}><FaRegTrashAlt /></button>
                      </td> */}
                  </tr>
            ))}
          </tbody>
      </Table>
  </div>
  );
};