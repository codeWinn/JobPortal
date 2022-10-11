import React,{useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
//Datatable Modules


export default function Datatable5() {
  return(
    <Table striped bordered hover>
    <thead>
        <tr>
            <th>Destinagtion</th>
            <th>Company</th>
            <th>Post Date</th>
        </tr>
        </thead>
        <tbody className='table-col'>
        <tr >
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
        </tr>
        <tr >
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
        </tr>
    </tbody>
  </Table>
  );
}