import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Axios from 'axios';
import Update_Employee from "./Update_Employee";
import Switch from '@mui/material/Switch';

function View_Employee(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        Axios.get("employee/view")
            .then((response) => {
                console.log(response.data.result)
                setData(response.data.result);
            }
            )
    }
    const handleStatus = (id)=> {
        Axios.get ("employee/status/{id}",{id:id})
        .then(result => {
            console.log(result.user.status);
        });
        fetchData();
        setval(!val);
    }
    const [val,setval] = useState(true)

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        Axios.get("employee/empDetails/" + id);
        fetchData();
        alert("successfully Deleted")
    }
        

    
    

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="breadcrumb breadcrumb-style ">
                                <li className="breadcrumb-item">
                                    <h4 className="page-title">Candidate</h4>
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
                                    View Candidate</li>
                            </ul>
                        </div>
                        <div>
                            <button className="btn btn-primary" style={{ float: 'right',marginBottom:"10px",fontSize:"12px" }} onClick={() => navigate("/Add_Employee")}>Add Employee</button>
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
                                        <th>Candidate Name</th>
                                        <th>Contact No</th>
                                        <th>Email Id</th>
                                        <th>Local Address</th>
                                        <th>Permanent Address</th>
                                        <th>Pincode</th>
                                        <th>Status</th>
                                        <th colSpan={2} >Action</th>
                                    </tr>
                                </thead>
                                <tbody className="TableColumns ">
                                    {data.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.contact_no}</td>
                                            <td>{user.email}</td>
                                            <td>{user.local_address}</td>
                                            <td>{user.permanent_address}</td>
                                            <td>{user.pincode}</td>
                                            <td>
                                                {/* <Switch checked={val}  onClick={() => handleStatus(user.id,user.status)}>{user.status}</Switch> */}
                                                <Switch defaultChecked={user.status=="enable"?true:false}
                                                     value={user.status}
                                                     name="status"
                                                     onClick={()=> handleStatus(user.id,user.status)}></Switch>
                                            </td>
                                            <td style={{borderStyle:"none"}}>
                                                <Link to={"/Update_Employee/" + user.id} style={{ color: 'green' }}>
                                                    <FaRegEdit />
                                                </Link>
                                            </td>
                                            <td style={{borderStyle:"none"}}>
                                                <button className="" style={{ color: "red" }} onClick={() => handleDelete(user.id)}><FaRegTrashAlt /></button>
                                            </td>
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
export default View_Employee;