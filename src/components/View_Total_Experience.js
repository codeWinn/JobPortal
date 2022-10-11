import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import Switch from '@mui/material/Switch';
import axios from "axios";

function View_Total_Experience() {

     const navigate = useNavigate();
     const [totalExperience, setTotalExperience] = useState([]);

     const fetchData = () => {
          axios.get("total_experience/view")
               .then((res) => {
                    console.log(res.data);
                    setTotalExperience(res.data.result);
               });
     }

     const handleDelete = (id) => {
          axios.get("/total_experience/delete/" + id)
               .then((res) => {
                    Swal.fire("Data Deleted Successfully");
                    fetchData();
               });
     }

     const statusHandler = (id) => {
          axios.get(`total_experience/status/${id}`,{id:id})
               .then((res) => {
                    console.log(res.data.message);
               });
          fetchData();
     }

     useEffect(() => {
          fetchData();
     }, [])


  return (
     <section className="content">
     <div className="container-fluid">
          <div className="block-header">
               <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                         <ul className="breadcrumb breadcrumb-style ">
                              <li className="breadcrumb-item">
                                   <h4 className="page-title">Total Experience</h4>
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
                                   View Total Experience</li>
                         </ul>
                    </div>
                    <div>
                         <button onClick={() => navigate("/Add_Total_Experience")} className="btn btn-primary" style={{ float: 'right', marginBottom: "10px", fontSize: "12px" }}>Add Total Experience</button>
                    </div>
               </div>
          </div>
          <div className="row">
               <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                         <Table striped bordered hover responsive>
                              <thead>
                                   <tr>
                                        <th>Id</th>
                                        <th>Total Experience</th>
                                        {/* <th>Status</th> */}
                                        <th colSpan={2} >Action</th>
                                        <th>Create Date</th>
                                   </tr>
                              </thead>
                              <tbody className="TableColumns">
                                   {totalExperience.map((item) => (
                                        <tr key={item.id}>
                                             <td>{item.id}</td>
                                             <td>{item.experience}</td>
                                             {/* <td >
                                             <Switch
                                                  defaultChecked={item.exp_status=="enable"?true:false}
                                                  defaultValue={item.exp_status}
                                                  name="status"
                                                  onChange={()=> statusHandler(item.id,item.exp_status)}
                                                  />
                                             </td> */}
                                             <td style={{ borderStyle: "none" }}>
                                                  <Link to={"/Update_Total_Experience/" + item.id} style={{ color: 'green' }}>
                                                       <FaRegEdit />
                                                  </Link>
                                             </td>
                                             <td style={{ borderStyle: "none" }}>
                                                  <button className="" style={{ color: "red" }} onClick={() => handleDelete(item.id)}><FaRegTrashAlt /></button>
                                             </td>
                                             <td>{item.create_date}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </Table>
                    </div>
               </div>
          </div>
     </div>
</section>
  )
}
export default View_Total_Experience