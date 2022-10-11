
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";

export default function Datatable6() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios.get("candidate/view").then((res) => {

      setData(res.data);
      console.log(res.data);
    })
  }
  const [val, setval] = useState(true)

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.get("/candidate/delete/" + id, { id: id });
    alert('successfully Deleted')
    fetchData();
  }

  const handlestatus = (id) => {
    axios.get(`/candidate/approval/${id}`, { id: id }).then((res) => {
      alert(res.data.message);
      fetchData();
    })
  }
  return (
    <Table striped bordered hover responsive >
      <thead>
        <tr>
          <th>S no</th>
          <th>Id</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Total Experiance</th>
          <th>Expected Salary</th>
          <th>Notice Period</th>
          <th>Highest Education</th>
          <th>Industry</th>
          <th>State*</th>
          <th>Pin Code</th>
          <th>Mobile No*</th>
          <th>Email Id*</th>
          <th>Monthly salary</th>
          <th colSpan={3} className="text-center">Action</th>
          <th className="text-center">Approval/Reject</th>
        </tr>
      </thead>
      <tbody className="TableColumns ">
        {data.map((items) => (
          <tr key={items.id}>
            <td>{items.S_no}</td>
            <td>{items.id}</td>
            <td>{items.name}</td>
            <td>{items.designation}</td>
            <td>{items.total_experiance}</td>
            <td>{items.expected_salary}</td>
            <td>{items.notice_period}</td>
            <td>{items.highest_education}</td>
            <td>{items.industry}</td>
            <td>{items.state}</td>
            <td>{items.pin_code}</td>
            <td>{items.mobile_no}</td>
            <td>{items.email_id}</td>
            <td>{items.monthly_salay}</td>
            <td style={{ borderStyle: "none", textAlign: "center" }}>
              <Link style={{ color: "green", }} to={"/viewprofile/" + items.id}><AiFillEdit /></Link>
            </td>
            <td style={{ borderStyle: "none" }}>
              <button className="" style={{ color: "red", fontSize: "12px" }} onClick={() => handleDelete(items.id)} ><FaRegTrashAlt /></button>
            </td>
            <td style={{ borderStyle: "none" }}>
              <Link style={{ padding: "2px" }} to={"/viewall/" + items.id}><FaRegEye /></Link>
            </td>
            <td value={items.id}><button className={items.app_rej == "approval" ? "btn btn-success kite" : "btn btn-danger kite"} onClick={() => { handlestatus(items.id) }}>{items.app_rej}</button></td>
            {/* <td><Switch
              checked={val} >{items.job_status}</Switch></td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}