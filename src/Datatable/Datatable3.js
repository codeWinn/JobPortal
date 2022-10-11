import React,{useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
export default function Datatable3() {
return(
  <Table striped bordered hover responsive>
  <thead>
      <tr>
          <th>Training</th>
          <th>Feebacks</th>
          <th>E-Books</th>
          <th>Candidate</th>
          <th>Recruiter Refferal</th>
      </tr>
  </thead>
  <tbody  className='table-col'>
        <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>2011/04/25</td>
        </tr>
        <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
        </tr>
    </tbody>
  </Table>
  );
}