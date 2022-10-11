import React,{useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { data } from 'jquery';
import Api from 'datatables.net';

export default function Datatable11() {
                                    //  need to pass the api

  const [data, setData]=useState([])
  
  return(
    <Table striped bordered hover responsive>
      <thead>
        <tr>
            <th>S No</th>
            <th>Recuriter Name</th>
            <th>Reffered By</th>
            <th>Recuriter Rate</th>
            <th>Selected Candiadte</th>
            <th>Payment</th>
        </tr>
        </thead>
        <tbody className='table-col'>
        {data.map((items)=>(
          <tr key= {items.id}>
            <td>{items.s_no}</td>
            <td>{items.recuriter_name}</td>
            <td>{items.reffered_rate}</td>
            <td>{items.selected_candidate}</td>
            <td>{items.payment}</td>
        </tr>
        ))}
      </tbody>
  </Table>
  );
}