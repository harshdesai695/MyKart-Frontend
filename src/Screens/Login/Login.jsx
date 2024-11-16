import React, { useContext } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthProvider';
import { loginUser, addUser } from '../../Controller/UserController';

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
    //Login
    if (pid === 'login') {
      response = await loginUser(formDataObject);
    } else {
      response = await addUser(formDataObject);
    }

    if (response.status === 200) {
      console.log("UserId:", response.data.userId)
      login(response.data.userId);
      navigate('/');
    }
  }

  return (
    <center>
      {pid === "login" ?
        <div className='Main-Container'>
          <form className="Login-Container" onSubmit={handleFormSubmit}>
            <div className="card">
              <span className="login">Welcome Back</span>
              <div className="inputBox">
                <input id='userName' name='userName' type="text" required="required" />
                <span className="user">Username</span>
              </div>
              <div className="inputBox">
                <input id='password' name='password' type="password" required="required" />
                <span>Password</span>
              </div>
              <button type='submit' className="LoginSignupButton">Login</button>
            </div>
          </form>
        </div>
        :
        <div className='Main-Container'>
          <form className="SignUp-Container" onSubmit={handleFormSubmit}>
            <div className="card">
              <span className="login">Create Account</span>
              <div className="inputBox">
                <input id='userName' name='userName' type="text" required="required" />
                <span className="user">Username</span>
              </div>
              <div className="inputBox">
                <input id='email' name='email' type="text" required="required" />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <input id='password' name='password' type="password" required="required" />
                <span>Password</span>
              </div>
              <div className="inputBox">
                <input id='apassword' name='apassword' type="password" required="required" />
                <span>Confirm Password</span>
              </div>
              <button type='submit' className="LoginSignupButton">Sign-Up</button>
            </div>
          </form>
        </div>
      }
    </center>
  )
}

export default Login
