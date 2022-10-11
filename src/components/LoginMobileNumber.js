import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from '../Assets/css/Login.css';
import LoginImage from "../Assets/images/loginimg/Login.png";
import axios from "axios";
import Swal from 'sweetalert2';



function LoginMobileNumber(props) {

  const baseUrl = "users/otp";
  const navigate = useNavigate();
  const [data, setData] = useState({
    mobile_no: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(baseUrl, {
      mobile_no: data.mobile_no
    })
      .then(res => {
        if(res.data.mobile_no === data.mobile_no)
        {
          console.log(res.data.mobile_no);
          new Swal("OTP Send Successfully");
          navigate("/OtpScreen",{state:{mobile:res.data.mobile_no}})
        }
        
      })
  }
  function handleChange(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata);
  }
  return (
    <>
      <div className="container-fluid Background_Pink">
        <div className="container PaddingTop_100">
          <div className="row">
            <div className="col-12 ImageBox">
              <div className="row">
                <div className="col-xl-6 clo-lg-6 col-md-12 col-sm-12 col-12 m-0 p-0">
                  <div className="LoginImageBox">
                    <img src={LoginImage} />
                  </div>
                </div>
                <div className="col-xl-6 clo-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-xl-6 clo-lg-6 col-md-12 col-sm-12 col-12 MobileNoBox">
                      <h1>Login</h1>
                      <div className="FormBox">
                        <div className="cont">
                          <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form sign-in">
                              <h2>Welcome</h2>
                              <label>
                                <span>Enter Your Mobile Number</span>
                                <input
                                  type="phone"
                                  maxLength="10"
                                  placeholder="+91-999-999-9999"
                                  id="mobile_no"
                                  value={data.mobile_no}
                                  onChange={(e) => handleChange(e)}
                                />
                              </label>
                              <button type="submit" className="LoginButton">Login</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginMobileNumber;