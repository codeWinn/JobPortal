import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Form, Col, Button, Row } from "react-bootstrap";
import axios from "axios";

function Update_Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    category_name: "",
  });

  const loadUser = async () => {
    const resultCategory = await axios.get(
      "category/updateCategory/" + id
    );
    console.log(resultCategory);
    setData(resultCategory.data);
  };
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("job_category/update", {
        id: id,
        category_name: data.category_name,
      })
      .then((res) => {
        alert("Form Submitted Successfully");
        console.log(res.data);
        navigate("/List_Category");
      });
  }
  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Category</h4>
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
                  Update Category
                </li>
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
                    <Link
                      to="javascript:void(0);"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
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
                        <Link to="javascript:void(0);">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="category_name"
                    className="utf-with-border"
                    placeholder="Job Category Name"
                    onChange={(e) => handleChange(e)}
                    value={data.category_name}
                  />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Col>
                    <Button type="submit">Update Category</Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Update_Category;
