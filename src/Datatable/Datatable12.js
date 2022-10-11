import React,{useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { data } from 'jquery';
import Api from 'datatables.net';

export default function Datatable12() {

     const [data, setData]= useState([]);
                                        // need to fetch Api

  return(
    <Table striped bordered hover responsive>
      <thead>
          <tr>
              <th>S no</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Contact No.</th>
              <th>Query Type</th>
          </tr>
          </thead>
          <tbody className='table-col'>
          {data.map((items)=>(
            <tr key= {items.id}>
              <td>{items.s_no}</td>
              <td>{items.name}</td>
              <td>{items.email_id}</td>
              <td>{items.query_type}</td>
          </tr>
          ))}
          </tbody>
  </Table>
  );
}