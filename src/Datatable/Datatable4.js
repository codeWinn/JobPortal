import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Switch from '@mui/material/Switch';
import axios from 'axios';

export default function Datatable4() {

  const [data, setData] = useState([]);
  // const [val, setval] = useState();



  const navigate = useNavigate();
  const fetchData = () => {
    axios.get("recruiterandjobpost/view").then((res) => {
      setData(res.data);
    })
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  function handleDelete(id) {
    axios.get("job_posting/delete/" + id, { id: id }).then(
      (result) => {
        console.log(result.items);
      }
    );
    alert("Delete Successfully");
    fetchData();
  }

  const statusHandler = (id,status) => {
    axios.get(`job_posting/status/${id}`,{id:id}).then((res)=>{
      console.log(res)
      fetchData();
    })
  };

  const handlestatus = (id) => {
    axios.get(`job_posting/approval/${id}`, { id: id }).then((res) => {
      alert(res.data.message);
      fetchData();
    })
  }



  return (
    <div className="table-responsive">
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>Sn</th>
            <th>Designation</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Total Experience</th>
            <th>Expected Salary</th>
            <th>Qualification</th>
            <th>Industry</th>
            <th>Location</th>
            <th>State</th>
            <th colSpan={3}>Action</th>
            <th>App/Rej</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items) => (
            <tr key={items.id} className='TableColumns'>
              <td>{items.sn}</td>
              <td>{items.designation}</td>
              <td>{items.age}</td>
              <td>{items.gender}</td>
              <td>{items.department}</td>
              <td>{items.experience}</td>
              <td>{items.expected_salary}</td>
              <td>{items.qualification}</td>
              <td>{items.industry}</td>
              <td>{items.location}</td>
              <td>{items.state}</td>
              <td style={{ width: "50px" }}>
                <Switch
                  defaultChecked={items.status=="enable"?true:false}
                  defaultValue={items.status}
                  name="status"
                  onChange={()=> statusHandler(items.id,items.status)}
                />
              </td>
              <td style={{ borderStyle: "none" }}>
                <Link
                  style={{ color: "green" }}
                  to={"/Update_Job_Posting/" + items.id}
                >
                  <AiFillEdit />
                </Link>
              </td>
              <td style={{ borderStyle: "none" }}>
                <button
                  className=""
                  onClick={() => handleDelete(items.id)}
                  style={{ color: "red" }}>
                  <AiFillDelete />
                </button>
              </td>
              <td style={{ borderStyle: "none" }}>
                <Link style={{ padding: "2px" }} to={"/jobpostcard/" + items.id}><FaRegEye /></Link>
              </td>
              <td><button className={items.job_status == "approval" ? "btn btn-success kite" : "btn btn-danger kite"} onClick={() => { handlestatus(items.id) }}>{items.job_status}</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
