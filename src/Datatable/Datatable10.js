import React,{useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { data } from 'jquery';
import Api from 'datatables.net';


export default function Datatable10() {

  const [data, setData]= useState([])
                                      // need to pass the Api
  return(
    <Table striped bordered hover responsive >
        <thead>
            <tr>
                <th>Emp Name</th>
                <th>Email ID</th>
                <th>Contact No.</th>
                <th>Current Employer</th>
                <th>Current Employer Contact No</th>
                <th>Current Employer Email</th>
                <th>Past Employer</th>
            </tr>
          </thead>
          <tbody className='table-col'>
            {data.map((items)=>{
              <tr key={items.id}>
                  <td>{items.emp_name}</td>
                  <td>{items.email_id}</td>
                  <td>{items.contact_no}</td>
                  <td>{items.current_employer}</td>
                  <td>{items.current_employer_contact_no}</td>
                  <td>{items.past_employer}</td> 
              </tr>
            })}  
          </tbody>
  </Table>
  );
}