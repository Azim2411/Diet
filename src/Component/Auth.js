import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [authId, setAuthId] = useState("vickysoni");
  const [authPassword, setAuthPassword] = useState("vicky@123");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors]=useState("")

  const navigate=useNavigate()


 
  const handleLogin = () => {
    if (id.length < 1 || password.length < 1) {
      setErrors("Please Enter Valid Credentials")
      return;
    }
    if(id !=authId || password !=authPassword){
      setErrors("Please Enter Valid Credentials")
      return 
    }
    localStorage.setItem("diet_isLoggedIn", true);
    navigate("/")
  };
  return (
    <div className="login-wrapper vh-100 vw-100 ">
      <div className="container-fluid border vh-100 vw-100">
      {errors.length >0 && <div class="alert text-center alert-danger position-absolute" style={{top:0,right:0,left:0}} role="alert">
            {errors}
          </div>}
        <div className="row justify-content-center align-items-center vh-100 vw-100">
          
          <div className="col-lg-4">
            <div className="login-form box-shadow p-3">
              <input
                type="text"
                placeholder="Enter Id"
                className="form-control mb-2"
                autoComplete={false}
                onChange={(e)=>setId(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-2"
                autoComplete={false}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="text-center ">
                <button className="btn btn-light box-shadow" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
