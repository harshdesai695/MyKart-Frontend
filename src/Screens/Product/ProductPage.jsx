import React, { useState, useContext, useEffect } from "react";
import "./ProductPage.css";
import { useLocation } from "react-router-dom";
import StarRating from "../../Components/CustomComponents/Rating";
import { PrimaryButton } from "../../Components/CustomComponents/CustomButtons";
import { AuthContext } from "../../Auth/AuthProvider";
import {
  toastError,
  toastSuccess,
} from "../../Components/CustomComponents/Toast";
import { isJsonObject } from "../../Function/GenericFunctions";
import {
  addToCartList,
  addToWithList,
} from "../../Controller/UserActivityController";
import { IKImage } from "imagekitio-react";
import { getSeller } from "../../Controller/SellerController";

const ProductPage = () => {
  const location = useLocation();
  const { state } = location;
  const { userId } = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState(null);

  const onWishListClick = async () => {
    if (userId == null) {
      toastError("Please Login/Register to WishList Your Product");
    } else {
      let response = await addToWithList(userId, state.productData.productId);
      if (!isJsonObject(response.data)) {
        toastError(response.data.data);
      } else if (response.data.data === "Item Already Present in WishList") {
        toastSuccess(response.data.data);
      } else if (response.status === 201) {
        toastSuccess("Product added to wishlist");
      }
    }
  };

  const onAddToCartButtonClick = async () => {
    if (userId == null) {
      toastError("Please Login/Register to Add Products to Cart");
    } else {
      let response = await addToCartList(userId, state.productData.productId);
      if (!isJsonObject(response.data)) {
        toastError(response.data.data);
      } else if (response.data.data === "Item Already Present in Cart") {
        toastSuccess(response.data.data);
      } else if (response.status === 201) {
        toastSuccess("Cart Updated Successfully");
      }
    }
  };

  useEffect(() => {
    fetchSellerDetails();
  }, [state.productData.sellerId]);

  const fetchSellerDetails = async () => {
    setIsLoading(true);
    console.log("Fetching seller details for ID:", state.productData.sellerId);
    // if (!state.productData.sellerId) {
    //   setIsLoading(false);
    //   return;
    // }
    try {
      const response = await getSeller(state.productData.sellerId);
      if (response) {
        setSellerDetails(response.data);
      } else {
        toastError("Could not load seller details.");
      }
    } catch (error) {
      toastError("An error occurred while fetching seller details.");
      // console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-page">
      <div className="thumbnail-column">
        {state.productData.productImageUrl.map((image, index) => (
          <div
            key={index}
            className={`thumbnail-container ${
              selectedIndex === index ? "active-thumbnail" : ""
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <IKImage
              urlEndpoint={"https://ik.imagekit.io/hhdesai/Products/"}
              path={state.productData.productName + "/" + image + ".jpg"}
            />
          </div>
        ))}
      </div>

      <div className="main-image-column">
        <IKImage
          urlEndpoint={"https://ik.imagekit.io/hhdesai/Products/"}
          path={
            state.productData.productName +
            "/" +
            state.productData.productImageUrl[selectedIndex] +
            ".jpg"
          }
        />
      </div>

      <div className="details-column">
        <div className="product-info-card">
          <h1 className="product-name">{state.productData.productName}</h1>
          <p className="brand-name">Brand: {state.productData.brandName}</p>
          <p className="product-cost">₹{state.productData.productCost}</p>
          <div className="product-rating">
            <StarRating rating={state.productData.productRating} />
          </div>

          <div className="product-specs">
            <h3>Specifications:</h3>
            <ul>
              {Object.entries(state.productData.productDetails).map(
                ([key, value]) => (
                  <li key={key}>
                    <span>{key}:</span> {value}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="purchase-section">
            <p>Quantity Available: {state.productData.productQuantity}</p>
            <div className="action-buttons">
              <PrimaryButton
                lable={"Wishlist"}
                onClick={(event) => {
                  event.stopPropagation();
                  onWishListClick();
                }}
              />
              <PrimaryButton
                lable={"Add To Cart"}
                onClick={(event) => {
                  event.stopPropagation();
                  onAddToCartButtonClick();
                }}
              />
            </div>
          </div>
        </div>

        {/* Seller Info Card */}
        <div className="seller-info-card">
          <h3>Sold By:</h3>
          {isloading ? (
            <p>Loading seller...</p>
          ) : sellerDetails ? (
            <div className="seller-card-content">
              <img
                src={sellerDetails.sellerLogo}
                alt={sellerDetails.sellerName}
                className="seller-logo"
              />
              <div className="seller-text-info">
                <p className="seller-name">{sellerDetails.sellerName}</p>
                <p className="seller-contact">{sellerDetails.sellerEmail}</p>
                <p className="seller-contact">{sellerDetails.sellerPhoneNo}</p>
              </div>
            </div>
          ) : (
            <p>Seller information not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
