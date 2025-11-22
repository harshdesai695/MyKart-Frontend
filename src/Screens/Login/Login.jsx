import React, { useContext } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { loginUser, addUser } from "../../Controller/UserController";
import { parseJwt } from "../../Function/GenericFunctions"; // Import decoder

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pid } = location.state || {};
  const { login } = useContext(AuthContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    event.target.reset();
    
    let response = null;

    try {
        if (pid === "login") {
          response = await loginUser(formDataObject);
          // Backend returns: { success: true, data: "JWT_STRING" }
          
          if (response.success) {
            const token = response.data;
            // Decode token to find userId
            const decoded = parseJwt(token); 
            const userId = decoded ? decoded.userId : null; // Ensure backend JWT claim is 'userId'

            if (userId) {
                console.log("Login Success. UserID:", userId);
                // Pass BOTH userId and token to AuthProvider
                login(userId, token);
                navigate("/Home");
            } else {
                console.error("Failed to extract UserID from token");
            }
          }
        } else {
          // Sign Up
          response = await addUser(formDataObject);
          if (response.success) {
             // Usually redirect to login after signup, or auto-login if backend returns token
             // For now assuming redirect to login behavior or manual login required
             navigate("/Login", { state: { pid: "login" } });
          }
        }
    } catch (error) {
        console.error("Operation failed", error);
    }
  };

  return (
    <center>
      {pid === "login" ? (
        <div className="Main-Container">
          <form className="Login-Container" onSubmit={handleFormSubmit}>
            <div className="card">
              <span className="login">Welcome Back</span>
              <div className="inputBox">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required="required"
                />
                <span className="user">Username</span>
              </div>
              <div className="inputBox">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required="required"
                />
                <span>Password</span>
              </div>
              <button type="submit" className="LoginSignupButton">
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="Main-Container">
          <form className="SignUp-Container" onSubmit={handleFormSubmit}>
            <div className="card">
              <span className="login">Create Account</span>
              <div className="inputBox">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required="required"
                />
                <span className="user">Username</span>
              </div>
              <div className="inputBox">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required="required"
                />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <input
                  id="phoneNo"
                  name="phoneNo"
                  type="text"
                  required="required"
                />
                <span>Phone No</span>
              </div>
              <div className="inputBox">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required="required"
                />
                <span>Password</span>
              </div>
              <button type="submit" className="LoginSignupButton">
                Sign-Up
              </button>
            </div>
          </form>
        </div>
      )}
    </center>
  );
};

export default Login;