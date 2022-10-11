import React,{useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Switch from '@mui/material/Switch';
import axios from "axios";


export default function Datatable8() {

  // need to fetch api

  const [data, setData] = useState([]);
  // const fetchData = () => {
  //   axios.get("recruiter/views").then((res) => {

  //     setData(res.data);
  //   })
  // }
  // const [val, setval] = useState(true)

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // // useEffect(()=>{
  // //   $(document).ready(function () {
  // //     $('#example1').DataTable();
  // // });
  // // })

  // const handleDelete = (id) => {
  //   axios.get("recruiter/delete/" + id, { id: id });
  //   alert('successfully Deleted')
  //   fetchData();
  // }

  // const handlestatus = (id) => {
  //   axios.get(`/recruiter/approval/${id}`, { id: id }).then((res) => {
  //     alert(res.data.message);
  //     fetchData();
  //   })
  // }
  
  return(
    <Table striped bordered hover responsive>
    <thead>
        <tr>
            <th>S no</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Feedback form</th>
        </tr>
        </thead>
        <tbody className='table-col'>
        {data.map((items) => (
          <tr key={items.id}>
              <td>{items.s_no}</td>
              <td>{items.name}</td>
              <td>{items.designation}</td>  
          </tr>
        ))}
    </tbody>
  </Table>
  );
}