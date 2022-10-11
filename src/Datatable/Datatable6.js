
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Table } from 'react-bootstrap';
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Switch from '@mui/material/Switch';
import axios from "axios";

// import 'jquery/dist/jquery.min.js';
// //Datatable Modules
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
// import $ from 'jquery';

export default function Datatable6() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios.get("recruiter/views").then((res) => {
      setData(res.data);
    })
  }
  const [val, setval] = useState(true)

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(()=>{
  //   $(document).ready(function () {
  //     $('#example1').DataTable();
  // });
  // })

  const handleDelete = (id) => {
    axios.get("recruiter/delete/" + id, { id: id });
    alert('successfully Deleted')
    fetchData();
  }

  const handlestatus = (id) => {
    axios.get(`/recruiter/approval/${id}`, { id: id }).then((res) => {
      alert(res.data.message);
      fetchData();
    })
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Company Name</th>
          <th>State</th>
          <th>Created at</th>
          <th>Email Id</th>
          <th>Mobile No</th>
          <th>Date Of Joining</th>
          <th>Date Of Leave</th>
          <th colSpan={3} className="text-center">Action</th>
          <th>Approval/Reject</th>
          <th>Updated at</th>
           {/* <th>Sn</th> */}
           {/* <th>Location</th> */}
           {/* <th>Designation</th> */}
            {/* <th>GST No</th>
          <th>Pan No</th> */}
          {/* <th>Payment</th>
          <th>Monthly Data Access Limit</th>
          <th>Plan Start Date</th>
          <th>Expiry date</th> */}
        </tr>
      </thead>
      <tbody className="TableColumns">
        {data.map((items) => (
          <tr key={items.id}>
            <td>{items.id}</td>
            <td>{items.name}</td>
            <td>{items.company_name}</td> 
            <td>{items.address}</td>
            <td>{items.created_at}</td>
            <td>{items.email}</td>
            <td>{items.mobile_no}</td>
            <td>{items.doj}</td>
            <td>{items.dol}</td>
            <td style={{ borderStyle: "none", textAlign: "center" }}>
              <Link style={{ color: "green", }} to={"/viewprofile/" + items.id}><AiFillEdit /></Link>
            </td>
            <td style={{ borderStyle: "none" }}>
              <button className="" style={{ color: "red", fontSize: "12px" }} onClick={() => handleDelete(items.id)} ><FaRegTrashAlt /></button>
            </td>
            <td style={{ borderStyle: "none" }}>
              <Link style={{ padding: "2px" }} to={"/viewall/" + items.id}><FaRegEye /></Link>
            </td>
            <td value={items.id}><button className={items.job_status == "approval" ? "btn btn-success kite" : "btn btn-danger kite"} onClick={() => { handlestatus(items.id) }}>{items.job_status}</button>
            </td>
            <td>{items.updated_at}</td>

             {/* <td>{items.designation}</td> */}
             {/* <td>{items.gst_no}</td>
            <td>{items.pan_no}</td> */}
             {/* <td>{items.sn}</td> */}
            {/* <td>{items.location}</td> */}
            {/* <td><Switch
              checked={val} >{items.job_status}</Switch></td> */}

           {/* <td>{items.payment}</td>
           <td>{items.monthly_data}</td> 
           <td>{items.plan_start_day}</td> 
           <td>{items.expiry_date}</td>  */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}