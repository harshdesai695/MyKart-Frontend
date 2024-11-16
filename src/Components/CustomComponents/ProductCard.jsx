import React, { useContext, useState, useEffect } from "react";
import "./ProductCard.css";
import { WishList, ProductCardButton } from "./CustomButtons";
import { AuthContext } from "../../Auth/AuthProvider";
import {
  addToWithList,
  addToCartList,
} from "../../Controller/UserActivityController";
import StarRating from "./Rating";
import { toastError, toastSuccess } from "./Toast";

export const ProductCard = ({ onclick, product }) => {
  const { userId } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const onBuyButtonclick = () => {
    console.log("Buy:" + product.productId);
  };

  const onAddToCartButtonClick = () => {
    if (userId == null) {
      window.alert("Please Login/Register to Add Product to Cart");
    } else {
      addToCartList(userId, product.productId);
      console.log("Product_id:" + product.productId);
    }
  };

  const onWishListClick = async () => {
    if (userId == null) {
      window.alert("Please Login/Register to WishList Your Product");
    } else {
      toastSuccess("Product added to wishlist");
      toastError("Productssssssssssssss added to wishlist");
      addToWithList(userId, product.productId);
      console.log("Product_id:" + product.productId);
    }
  };

  useEffect(() => {
    let imageTransition;
    if (isHovering) {
      imageTransition = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % product.productImageUrl.length
        );
      }, 750); // Change image every 1 second
    }
    return () => clearInterval(imageTransition);
  }, [isHovering, product.productImageUrl.length]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0); // Reset to the first image
  };

  return (
    <div className="Product-Container">
      <div
        className="Image-Container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="wishlistButton">
          <WishList onClick={onWishListClick} />
        </div>
        <img
          src={product.productImageUrl[currentImageIndex]}
          alt={product.productName}
        />
      </div>
      <div className="Product-Details">
        <div className="Product-Name">{product.productName}</div>
        <div className="Brand-Name">Brand: {product.brandName}</div>
        <div className="Product-Specs">
          <ul>
            {Object.entries(product.productDetails)
              .slice(0, 3)
              .map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
          </ul>
        </div>
        <div className="Product-Cost">
          RS.
          {product.productCost}
        </div>
        <div className="Product-Rating">
          Rating: <StarRating rating={product.productRating} />
        </div>
      </div>
      <div className="Button-Container">
        <ProductCardButton lable={"Buy"} onClick={onBuyButtonclick} />
        <ProductCardButton
          lable={"Add To Cart"}
          onClick={onAddToCartButtonClick}
        />
      </div>
    </div>
  );
};
