import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Row, Col, Button } from 'react-bootstrap';
import Axios from 'axios';


function Update_Designation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    department_id: "",
    designation_name: ""
  })

  const fetchData = () => {
    Axios.get("job_category/view_job")
      .then((response) => {
        console.log(response.data.result)
        setCategory(response.data.result);
      }
      )
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post("designation/update", {
      id: id,
      department_id: data.department_id,
      designation_name: data.designation_name

    })
      .then(res => {
        console.log(res.data)
        navigate("/View_Designation");
      })
  }
  function handleChange(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }


  const getDesignation = async () => {
    const resultDesignation = await Axios.get("designation/view/" + id);
    console.log(resultDesignation);
    setData(resultDesignation.data);
  };

  useEffect(() => {
    getDesignation();
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Designation</h4>
                </li>
                <FaHome className="HomeIcon" />
                <li className="breadcrumb-item bcrumb-1">
                  <IoIosArrowForward className="Arrow" />
                  <Link className="nav-link" to="">
                    Home
                  </Link>
                </li>
                <li className="DashboardActive">
                  <IoIosArrowForward className="Arrow" />
                  Update Designation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="header">
                <ul className="header-dropdown m-r--5">
                  <li className="dropdown">
                    <Link to="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      {/* <BiDotsVerticalRounded/> */}
                    </Link>
                    <ul className="dropdown-menu float-end">
                      <li>
                        <Link to="javascript:void(0);">Action</Link>
                      </li>
                      <li>
                        <Link to="javascript:void(0);">Another action</Link>
                      </li>
                      <li>
                        <Link to="javascript:void(0);">Something else here</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Row className="mb-3 p-3">
                  <Form.Group as={Col} >
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      id="department_id"
                      onChange={(e) => handleChange(e)}
                      value={data.department_id}
                    >
                      {/* <option value="0">---Choose Department---</option> */}
                      {category.map((items) => (
                        <option kye={items.id} value={items.id}>
                          {items.category_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Designation Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="designation_name"
                      placeholder="Enter Designation name"
                      onChange={(e) => handleChange(e)}
                      value={data.designation_name}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 p-3">
                  <Form.Group as={Col} >
                    <Col >
                      <Button type="submit">Update Designation</Button>
                    </Col>
                  </Form.Group>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Update_Designation;