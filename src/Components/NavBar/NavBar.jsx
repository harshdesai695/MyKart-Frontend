import React, { useContext, useState, useEffect, useRef } from "react";
import "./NavBar.css";
import {
  PrimaryButton,
  DropDownButton,
} from "../CustomComponents/CustomButtons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { FaSearch } from "react-icons/fa"; // Import Search Icon
import { searchProducts } from "../../Controller/ProductController"; // Import Search API

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuItems = ["Profile", "WishList", "Cart", "Orders"];
  
  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleOnClick = (pid) => {
    navigate("/Login", { state: { pid } });
  };

  const handleLogout = () => {
    logout();
    navigate("/Home");
  };

  const handleMenuClick = (item) => {
    navigate("/" + item);
  };

  const handleSellerMenuClick = (pid) => {
    navigate("/SellerLogin", { state: { pid } });
  };

  // --- SEARCH LOGIC ---

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Input Change & Fetch Suggestions
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const response = await searchProducts(value);
        if (response.success && Array.isArray(response.data)) {
          // Extract top 5 unique product names
          const uniqueSuggestions = [
            ...new Set(response.data.map((item) => item.productName)),
          ].slice(0, 5);
          setSuggestions(uniqueSuggestions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle Search Submit (Enter Key)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/SearchPage`, { state: { keyword: searchTerm } });
      setShowSuggestions(false);
      setSearchTerm(""); // CLEAR SEARCH BOX
    }
  };

  // Handle Suggestion Click
  const handleSuggestionClick = (suggestion) => {
    navigate(`/SearchPage`, { state: { keyword: suggestion } });
    setShowSuggestions(false);
    setSearchTerm(""); // CLEAR SEARCH BOX
  };

  return (
    <nav className="Navbar">
      <div className="prefix-container">
        <div className="MyKart-Logo" onClick={() => navigate("/Home")}>
          MyKart
        </div>
      </div>
      
      {/* Replaced SearchInput with Functional Search Bar */}
      <div className="middle-container" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)}
          />
          <button type="submit" className="nav-search-btn">
            <FaSearch />
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="nav-search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="nav-suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
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
              lable={"Seller"}
              onClick={() => handleSellerMenuClick("SellerLogin")}
            />

            <span className="separator">|</span>
            <PrimaryButton
              lable={"SignUp"}
              onClick={() => handleOnClick("signup")}
            />
            <span className="separator-inner">|</span>
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