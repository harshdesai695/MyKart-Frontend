import React, { useContext } from "react";
import "./NavBar.css";
import {
  PrimaryButton,
  DropDownButton,
} from "../CustomComponents/CustomButtons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { SearchInput } from "../CustomComponents/CustomInputs";

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuItems = ["Profile", "WishList", "Cart", "Orders"];
  const sellerMenu=["Seller Login","Seller Signup"];

  const handleOnClick = (pid) => {
    navigate("./Login", { state: { pid } });
  };

  const handleLogout = () => {
    logout();
    navigate("/Home");
  };

  const handleMenuClick = (item) => {
    navigate("/" + item);
  };

  const handleSellerMenuClick = (item) => {
    navigate("/" + item);
  }

  return (
    <nav className="Navbar">
      <div className="prefix-container">
        <div className="MyKart-Logo" onClick={() => navigate("/Home")}>
          MyKart
        </div>
      </div>
      <div className="middle-container">
        <SearchInput />
      </div>
      <div className="suffix-container">
        {isLoggedIn ? (
          <>
            <DropDownButton menuItems={menuItems} onClick={handleMenuClick} />
            <PrimaryButton lable={"Logout"} onClick={handleLogout} />
          </>
        ) : (
          <>
            <PrimaryButton
              lable={"SignUp"}
              onClick={() => handleOnClick("signup")}
            />
            <span>|</span>
            <PrimaryButton
              lable={"Login"}
              onClick={() => handleOnClick("login")}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
