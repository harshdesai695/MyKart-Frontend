import React, { useState, useContext } from "react";
import "./ProductPage.css";
import { useLocation } from "react-router-dom";
import StarRating from "../../Components/CustomComponents/Rating";
import { ProductCardButton } from "../../Components/CustomComponents/CustomButtons";
import { AuthContext } from "../../Auth/AuthProvider";
import {
  toastError,
  toastSuccess,
} from "../../Components/CustomComponents/Toast";
import { isJsonObject } from "../../Function/GenericFunctions";
import { addToCartList } from "../../Controller/UserActivityController";

const ProductPage = () => {
  const location = useLocation();
  const { state } = location;
  const { userId } = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onBuyButtonClick = () => {};

  const onAddToCartButtonClick = async () => {
    if (userId == null) {
      toastError("Please Login/Register to Add Products to Cart");
    } else {
      let response = await addToCartList(userId, state.product.productId);
      if (!isJsonObject(response.data)) {
        toastError(response.data);
      } else if (response.status === 200) {
        toastSuccess("Product added to Cart");
      }
    }
  };

  return (
    <div className="product-page">
      {/* Product Images Section */}

      <div className="Product-Small-images">
        {state.productData.productImageUrl.map((image, index) => (
          <div
            key={index}
            className="image-container"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image}
              alt={`${state.productData.productName} ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="product-images">
        <img
          src={state.productData.productImageUrl[selectedIndex]}
          alt={`${state.productData.productName} `}
        />
      </div>

      {/* Product Details Section */}
      <div className="product-info">
        <h1 className="product-name">{state.productData.productName}</h1>
        <p className="brand-name">Brand: {state.productData.brandName}</p>
        <p className="product-cost">₹{state.productData.productCost}</p>
        <p className="product-rating">
          Rating: <StarRating rating={state.productData.productRating} />
        </p>

        <div className="product-specs">
          <h3>Specifications:</h3>
          {Object.entries(state.productData.productDetails).map(
            ([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            )
          )}
        </div>

        {/* Purchase Section */}
        <div className="purchase-section">
          <p>Quantity Available: {state.productData.productQuantity}</p>
          <div className="Purchase-section-buttons">
            <ProductCardButton lable={"Buy"} onClick={onBuyButtonClick} />
            <ProductCardButton
              lable={"Add to Cart"}
              onClick={onAddToCartButtonClick}
            />
          </div>

          {/* <button className="add-to-cart">Add to Cart</button> */}
          {/* <button className="buy-now">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
