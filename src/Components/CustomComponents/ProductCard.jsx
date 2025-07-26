import React, { useContext, useState, useEffect } from "react";
import "./ProductCard.css";
import { WishList} from "./CustomButtons";
import { AuthContext } from "../../Auth/AuthProvider";
import {
  addToWithList,
  addToCartList,
} from "../../Controller/UserActivityController";
import StarRating from "./Rating";
import { toastError, toastSuccess } from "./Toast";
import { useNavigate } from "react-router-dom";
import { isJsonObject } from "../../Function/GenericFunctions";
import { IKImage } from "imagekitio-react";
import { PrimaryButton } from "./CustomButtons";

export const ProductCard = ({ onclick, product }) => {
  const { userId } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const onBuyButtonclick = () => {
    // console.log("Buy:" + product.productId);
  };

  const onAddToCartButtonClick = async () => {
    if (userId == null) {
      toastError("Please Login/Register to Add Products to Cart");
    } else {
      let response = await addToCartList(userId, product.productId);
      if (!isJsonObject(response.data)) {
        toastError(response.data);
      } else if (response.status === 200) {
        toastSuccess("Product added to Cart");
      }
    }
  };

  const onWishListClick = async () => {
    if (userId == null) {
      toastError("Please Login/Register to WishList Your Product");
    } else {
      let response = await addToWithList(userId, product.productId);
      if (!isJsonObject(response.data)) {
        toastError(response.data);
      } else if (response.status === 200) {
        toastSuccess("Product added to wishlist");
      }
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

  const onProductCardClick = () => {
    navigate("/ProductPage", { state: { productData: product } });
  };

  return (
    <div className="Product-Container" onClick={onProductCardClick}>
      <div
        className="Image-Container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="wishlistButton">
          <WishList
            onClick={(event) => {
              event.stopPropagation(); // Prevent click event from propagating to the parent
              onWishListClick();
            }}
          />
        </div>
        <IKImage
          urlEndpoint={"https://ik.imagekit.io/hhdesai/Products/"}
          path={
            product.productName +
            "/" +
            product.productImageUrl[currentImageIndex] +
            ".jpg"
          }
        />
        {/* <img
          src={product.productImageUrl[currentImageIndex]}
          alt={product.productName}
        /> */}
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
        <PrimaryButton
          lable={"Buy"}
          onClick={(event) => {
            event.stopPropagation(); // Prevent click event from propagating to the parent
            onBuyButtonclick();
          }}
        />
        <PrimaryButton
          lable={"Add To Cart"}
          onClick={(event) => {
            event.stopPropagation(); // Prevent click event from propagating to the parent
            onAddToCartButtonClick();
          }}
        />
        {/* <ProductCardButton
          lable={"Buy"}
          onClick={(event) => {
            event.stopPropagation(); // Prevent click event from propagating to the parent
            onBuyButtonclick();
          }}
        />
        <ProductCardButton
          lable={"Add To Cart"}
          onClick={(event) => {
            event.stopPropagation(); // Prevent click event from propagating to the parent
            onAddToCartButtonClick();
          }}
        /> */}
      </div>
    </div>
  );
};
