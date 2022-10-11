import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import {  FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Axios from 'axios';
import Switch from '@mui/material/Switch';

function View_Designation() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        Axios.get("category/view")
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
        Axios.get("designation/delete/" + id)
            .then(result => {
                console.log(result.items);
            });
        alert("Delete Successfully");
        fetchData();
    }

    const statusHandler = (id) =>{
        Axios.get(`designation/status/${id}`,{id:id})
        .then(result => {
            console.log(result.data.message);
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
                                    <h4 className="page-title">Designation</h4>
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
                                    View Designation</li>
                            </ul>
                        </div>
                        <div>
                            <button onClick={() => navigate("/Add_Designation")} className="btn btn-primary" style={{ float: 'right',marginBottom:"10px",fontSize:"12px" }}>Add Desgination</button>
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
                            <Table striped bordered hover responsive >
                                <thead >
                                    <tr>
                                        <th>Id</th>
                                        <th>Department Name</th>
                                        <th>Designation Name</th>
                                        {/* <th>Status</th> */}
                                        <th colSpan={2} className="text-center">Action</th>
                                        <th>Create Date</th>
                                    </tr>
                                </thead>
                                <tbody className="TableColumns">
                                    {data.map((items) => (
                                        <tr key={items.id}>
                                            <td>{items.id}</td>
                                            <td>{items.category_name}</td>
                                            <td>{items.designation_name}</td>
                                            {/* <td>
                                            <Switch
                                                defaultChecked={items.status=="enable"?true:false}
                                                defaultValue={items.status}
                                                name="status"
                                                onChange={()=> statusHandler(items.id,items.status)}
                                                />

                                            </td> */}
                                            <td style={{borderStyle:"none"}}>
                                                <Link style={{ color: "green" }} to={"/Update_Designation/" + items.id}><AiFillEdit /></Link>
                                            </td>
                                            <td style={{borderStyle:"none"}}>
                                                <button className="" style={{ color: "red" }} onClick={() => handleDelete(items.id)}><FaRegTrashAlt /></button>
                                            </td>
                                            <td>{items.create_date}</td>
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
export default View_Designation;