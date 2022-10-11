import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Axios from 'axios';
import Switch from '@mui/material/Switch';


function View_Category() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = () => {
        Axios.get("job_category/view_job")
            .then((response) => {
                console.log(response.data.result)
                setData(response.data.result);
            }
            )
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleDelete(id) {
        Axios.get("job_category/delete_job/" + id)
            .then(result => {
                console.log(result.user);
            });
        alert("Delete Successfully");
        fetchData();
    }
    
    const  statusHandler = (id) =>{
        Axios.get(`job_category/status/${id}`,{id:id})
            .then((res) => {
                console.log(res.data.message);
            });
        fetchData();
    }

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Category</h4>
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
                                    View Category</li>
                            </ul>
                        </div>
                        <div>
                            <button onClick={() => navigate("/Add_Categorylist")} className="btn btn-primary right" style={{ float: 'right',marginBottom:"10px",fontSize:"12px" }}>Add Category</button>
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
                                        <th>Category Name</th>
                                        {/* <th>Status</th> */}
                                        <th colSpan={2}>Action</th>
                                        <th>Create Date</th>
                                    </tr>
                                </thead>
                                {/* //{user.category_status} */}
                                <tbody className='TableColumns '>
                                    {data.map((user, index) => (
                                        <tr key={user.id} >
                                            <td>{user.id}</td>
                                            <td>{user.category_name}</td>
                                            {/* <td>
                                            
                                                <Switch
                                                defaultChecked={user.category_status=="enable"?true:false}
                                                     value={user.category_status}
                                                     name="status"
                                                     onChange={()=> statusHandler(user.id,user.status)}></Switch>
                                                  
                                            </td> */}
                                            <td style={{ borderStyle: "none" }}>
                                                <Link style={{ color: "green" }} to={"/Update_Category/" + user.id}><AiFillEdit /></Link>
                                            </td>
                                            <td style={{ borderStyle: "none" }}>
                                                <button className="" style={{ color: "red" }} onClick={() => handleDelete(user.id)}><FaRegTrashAlt /></button>
                                            </td>
                                            <td>{user.created_date}</td>
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
export default View_Category;