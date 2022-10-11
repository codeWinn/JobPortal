import React,{useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Datatable() {

  
  return (
    <Table striped bordered hover responsive >
    <thead>
        <tr>
            <th>Month</th>
            <th>Active Recuriter</th>
            <th>Inactive Recuriter</th>
            <th>Recruiter Payment</th>
            <th>Training Payment</th>
            <th>Interview Question Payment</th>
        </tr>
    </thead>
    <tbody  className='table-col'>
        <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>2011/04/25</td>
            <td>$320,800</td>
        </tr>
        <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
        </tr>
    </tbody>
  </Table>
  )
  }