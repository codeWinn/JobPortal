import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../Assets/css/Login.css"
import OTPImage from "../Assets/images/loginimg/OTP.png";
import axios from "axios";
import Swal from 'sweetalert2';

function OtpScreen(props) {

  const location = useLocation();
  const [data, setData] = useState({
    mobile_no: location.state.mobile,
    otp: ""
  })

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault(e);
    await axios.post("users/login_otp", {
      mobile_no: location.state.mobile,
      otp: data.otp
    })
      .then(res => {
        const user = res.data.resp;
        console.log(user.status);
        console.log(user.details.id);
        if (user.status == 1) {
          localStorage.setItem("auth_token", user.details.id);
          localStorage.setItem("auth_mobile", user.details.mobile_no);
          Swal.fire('Login Successfully');
          window.location.href = "/Dashboard";
          //navigate("/Dashboard");
        }
        else{
          Swal.fire("Login faild. Please try again");
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
                    <img src={OTPImage} />
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
                                <span>Enter OTP</span>
                                <input
                                  type="otp"
                                  MaxLength="8"
                                  placeholder="---------"
                                  id="otp"
                                  onChange={(e) => handleChange(e)}
                                  value={data.otp}
                                />
                              </label>
                              <button className="LoginButton">Login</button>
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
export default OtpScreen;