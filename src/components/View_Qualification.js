import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import Switch from '@mui/material/Switch';
import axios from "axios";


function View_Qualification() {
     const navigate = useNavigate();

     const [qualification, setQualification] = useState([]);
     

     const viewData = () => {
          axios.get("qualification/view")
               .then((res) => {
                    console.log(res);
                    setQualification(res.data.result);
               });
     }

     const handleDelete = (id) => {
          axios.get("qualification/delete/" + id)
               .then((res) => {
                    Swal.fire("Data Deleted Successfully");
                    viewData()
               });
               
     }

     const statusHandler = (id) => {
          axios.get(`qualification/status/${id}`,{id:id})
               .then((res) => {
                    console.log(res.data.message)
               })
          viewData();
     }

     useEffect(() => {
          viewData()
     }, []);

     return (
          <section className="content">
               <div className="container-fluid">
                    <div className="block-header">
                         <div className="row">
                              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                   <ul className="breadcrumb breadcrumb-style ">
                                        <li className="breadcrumb-item">
                                             <h4 className="page-title">High Qualification</h4>
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
                                             View Qualification</li>
                                   </ul>
                              </div>
                              <div>
                                   <button onClick={() => navigate("/Add_Qualification")} className="btn btn-primary" style={{ float: 'right', marginBottom: "10px", fontSize: "12px" }}>Add Qualification</button>
                              </div>
                         </div>
                    </div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                                   <div className="header">

                                        <ul className="header-dropdown m-r--5">
                                             <li className="dropdown">
                                                  <Link to="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                       {/* <BiDotsVerticalRounded/> */}
                                                  </Link>
                                                  <ul className="dropdown-menu float-end">
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
                                   <Table striped bordered hover responsive>
                                        <thead>
                                             <tr>
                                                  <th>Id</th>
                                                  <th>High Qualification</th>
                                                  {/* <th>Status</th> */}
                                                  <th colSpan={2} >Action</th>
                                                  <th>Create Date</th>
                                             </tr>
                                        </thead>
                                        <tbody className="TableColumns">
                                             {qualification.map((item) => (
                                                  <tr key={item.id}>
                                                       <td>{item.id}</td>
                                                       <td>{item.high_qualification}</td>
                                                       {/* <td >
                                                       <Switch
                                                            defaultChecked={item.qualification_status=="enable"?true:false}
                                                            defaultValue={item.qualification_status}
                                                            name="status"
                                                            onChange={()=> statusHandler(item.id,item.qualification_status)}
                                                            />
                                                       </td> */}
                                                       <td style={{ borderStyle: "none" }}>
                                                            <Link to={"/Update_Qualification/" + item.id} style={{ color: 'green' }}>
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
export default View_Qualification