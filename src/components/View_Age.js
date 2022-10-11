import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import Axios from 'axios';
import Switch from '@mui/material/Switch';

function View_Age() {

     const [data, setData] = useState([]);
     const navigate = useNavigate();
     const fetchData = () => {
          Axios.get("age/view")
            .then((response) => {
                console.log(response.data.result)
                setData(response.data.result);
            }
            )
     }
     useEffect(() => {
          fetchData();
     }, []);

     const statusHandler = (id) => {
          Axios.get(`age/status/${id}`,{id:id})
               .then((res) => {
                    console.log(res.data.message);
               })
          fetchData();
     }

     const handleDelete = (id) => {
          Axios.get("age/delete/" + id)
               .then(() => {
                    Swal.fire("Data Deleted Successfully");
                    fetchData();
               })
     }

     return (
          <section className="content">
               <div className="container-fluid">
                    <div className="block-header">
                         <div className="row">
                              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                   <ul className="breadcrumb breadcrumb-style ">
                                        <li className="breadcrumb-item">
                                             <h4 className="page-title">Age</h4>
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
                                             View Age</li>
                                   </ul>
                              </div>
                              <div>
                                   <button onClick={() => navigate("/Add_Age")} className="btn btn-primary" style={{ float: 'right', marginBottom: "10px", fontSize: "12px" }}>Add Age</button>
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
                                        <thead >
                                             <tr>
                                                  <th>Id</th>
                                                  <th>Age</th>
                                                  {/* <th>Status</th> */}
                                                  <th colSpan={2} >Action</th>
                                                  <th>Create Date</th>
                                             </tr>
                                        </thead>
                                        <tbody className="TableColumns">
                                             {data.map((item) => (
                                                  <tr key={item.id}>
                                                       <td>{item.id}</td>
                                                       <td>{item.age}</td>
                                                       {/* <td >
                                                       <Switch
                                                            defaultChecked={item.age_status=="enable"?true:false}
                                                            defaultValue={item.age_status}
                                                            name="status"
                                                            onChange={()=> statusHandler(item.id,item.age_status)}
                                                            />
                                                       </td> */}
                                                       <td style={{ borderStyle: "none" }}>
                                                            <Link to={"/Update_Age/" + item.id} style={{ color: 'green' }}>
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
export default View_Age