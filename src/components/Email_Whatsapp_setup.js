import React from 'react';
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaHome, FaRegWindowRestore, FaUsers, FaTasks } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Axios from 'axios';
import Switch from '@mui/material/Switch';



const Email_Whatsapp_setup = () => {
   

  return (
    <section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <ul className="breadcrumb breadcrumb-style ">
                        <li className="breadcrumb-item">
                            <h4 className="page-title">Email/Whatsapp setup</h4>
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
                            Email/Whatsapp setup
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                        <Table striped bordered hover responsive>
                                <thead className="text-center">
                                    <tr>
                                        <th>Id</th>
                                        <th>Auto Mail</th>
                                        <th>Draft</th>
                                        <th>Mail</th>
                                        <th>Message</th>
                                        <th>Set Reminder by default</th>
                                    </tr>
                                </thead>
                                {/* <tbody className="TableColumns text-center">
                                    {data.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.auto_mail}</td>
                                            <td>{item.draft}</td>
                                            <td>{item.mail}</td>
                                            <td>{item.massage}</td>
                                            <td>{item.set_reminder}</td>
                                        </tr>
                                    ))}
                                </tbody> */}
                            </Table>
                        </div>
                    </div>
                </div>
    </div>
    </section>
  )
}


export default Email_Whatsapp_setup;
