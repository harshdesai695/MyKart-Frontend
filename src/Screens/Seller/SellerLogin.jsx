import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SellerLogin.css";
import { use } from "react";

// Note: You'll need to create controller functions for both adding and logging in a seller.
// import { addSeller, loginSeller } from "../../Controller/SellerController";

const SellerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current mode ('seller-login' or 'become-a-seller') from the URL path
  const { pid } = location.state || {};
  const [id, setId] = useState(pid);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    console.log("Seller Form Data:", formDataObject);
    event.target.reset();

    let response = null;

    // Call the appropriate API based on the mode
    if (pid === "seller-login") {
      // --- Placeholder for Login API call ---
      // response = await loginSeller(formDataObject);
      console.log("Attempting seller login...");
    } else {
      // --- Placeholder for Signup API call ---
      // response = await addSeller(formDataObject);
      console.log("Attempting seller registration...");
    }

    // --- Placeholder for handling successful response ---
    // if (response && response.status === 200) {
    //   // For example, save seller auth token and redirect
    //   navigate("/seller-dashboard");
    // }
  };

  return (
    <center>
      {id === "SellerLogin" ? (
        // --- Seller Login Form ---
        <div className="Main-Container-Seller">
          <form className="SignUp-Container-Seller" onSubmit={handleFormSubmit}>
            <div className="card-seller login-card">
              <span className="title-seller">Seller Login</span>
              <div className="inputBox-seller">
                <input
                  id="sellerEmail"
                  name="sellerEmail"
                  type="email"
                  required="required"
                />
                <span>Email</span>
              </div>
              <div className="inputBox-seller">
                <input
                  id="sellerPassword"
                  name="sellerPassword"
                  type="password"
                  required="required"
                />
                <span>Password</span>
              </div>
              <button type="submit" className="SellerSignupButton">
                Login
              </button>
              <span
                className="switch-mode"
                onClick={() => setId("become-a-seller")}
              >
                Don't have an account? | Become a Seller
              </span>
            </div>
          </form>
        </div>
      ) : (
        // --- Seller Registration Form ---
        <div className="Main-Container-Seller">
          <form className="SignUp-Container-Seller" onSubmit={handleFormSubmit}>
            <div className="card-seller">
              <span className="title-seller">Become a Seller</span>
              <div className="inputBox-seller">
                <input
                  id="sellerName"
                  name="sellerName"
                  type="text"
                  required="required"
                />
                <span className="user">Seller Name</span>
              </div>
              <div className="inputBox-seller">
                <input
                  id="sellerEmail"
                  name="sellerEmail"
                  type="email"
                  required="required"
                />
                <span>Email</span>
              </div>
              <div className="inputBox-seller">
                <input
                  id="sellerPhoneNo"
                  name="sellerPhoneNo"
                  type="tel"
                  required="required"
                />
                <span>Phone Number</span>
              </div>
              <div className="inputBox-seller">
                <input
                  id="sellerLogo"
                  name="sellerLogo"
                  type="url"
                  required="required"
                />
                <span>Logo URL</span>
              </div>
              <div className="inputBox-seller">
                <input
                  id="sellerPassword"
                  name="sellerPassword"
                  type="password"
                  required="required"
                />
                <span>Password</span>
              </div>
              <button type="submit" className="SellerSignupButton">
                Register
              </button>
              <span
                className="switch-mode"
                onClick={() => setId("SellerLogin")}
              >
                Already Have an Seller Account|Login?{" "}
              </span>
            </div>
          </form>
        </div>
      )}
    </center>
  );
};

export default SellerLogin;
