import { data } from 'jquery';
import React,{useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";


export default function Datatable9() {
  
  const [data,setData]=useState([]);
                                        // need to fetch the correct api
  // const fetchData = () => {
  //   axios.get("candidate/view").then((res) => {

  //     setData(res.data);
  //     console.log(res.data);
  //   })
  // }
  // const [val, setval] = useState(true)

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const handleDelete = (id) => {
  //   axios.get("/candidate/delete/" + id, { id: id });
  //   alert('successfully Deleted')
  //   fetchData();
  // }

  // const handlestatus = (id) => {
  //   axios.get(`/candidate/approval/${id}`, { id: id }).then((res) => {
  //     alert(res.data.message);
  //     fetchData();
  //   })
  // }

  return(
    <Table striped bordered hover responsive>
      <thead>
          <tr>
              <th>S No</th>
              <th>Trainer Name</th>
              <th>Category</th>
              <th>Training Name</th>
              <th>Price</th>
              <th>Approve/Reject</th>
          </tr>
        </thead>
        <tbody className='table-col'>
          {data.map((items)=>(
            <tr key= {items.id}>
              <td>{items.s_no}</td>
              <td>{items.tariner_name}</td>
              <td>{items.category}</td>
              <td>{items.training_name}</td>
              <td>{items.price}</td>
              <td style={{ borderStyle: "none", textAlign: "center" }}>
              <Link style={{ color: "green", }} to={"/viewprofile/" + items.id}><AiFillEdit /></Link>
              </td>
              {/* <td style={{ borderStyle: "none" }}>
                <button className="" style={{ color: "red", fontSize: "12px" }} onClick={() => handleDelete(items.id)} ><FaRegTrashAlt /></button>
              </td>
              <td style={{ borderStyle: "none" }}>
                <Link style={{ padding: "2px" }} to={"/viewall/" + items.id}><FaRegEye /></Link>
              </td>
              <td value={items.id}><button className={items.app_rej == "approval" ? "btn btn-success kite" : "btn btn-danger kite"} onClick={() => { handlestatus(items.id) }}>{items.app_rej}</button></td> */}
          </tr>
          ))}
        </tbody>
    </Table>
  );
}