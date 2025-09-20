import React from "react";
import "./cards.css";
import StarRating from "./Rating";
import { DeleteIconButton } from "./CustomButtons";
import { IKImage } from "imagekitio-react";
import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";

export const ImageCard = ({ imageName, imageDescription, onclick }) => {
  return (
    <div className="Image-Card" onClick={onclick}>
      <div className="ImageBox">
        <IKImage
          urlEndpoint={"https://ik.imagekit.io/hhdesai/Brand_Logos/"}
          path={imageName + ".png"}
        />
        {/* <img
          src={
            "https://ik.imagekit.io/hhdesai/Brand_Logos/" + imageName + ".png"
          }
          alt=""
        /> */}
      </div>
      <div className="ImageContent">
        <h2>{imageName}</h2>
        <p>{imageDescription}</p>
      </div>
    </div>
  );
};

export const BrandCard = ({ brandName, slogan, imageUrl, onClick }) => {
  return (
    <div className="brand-card" onClick={onClick}>
      <IKImage
        className="brand-card-image"
        urlEndpoint="https://ik.imagekit.io/hhdesai/Brand_Logos/"
        path={imageUrl}
      />
      <div className="brand-card-overlay">
        <h3>{brandName}</h3>
        <p>{slogan}</p>
      </div>
    </div>
  );
};

export const WishListCard = ({ product, onDeleteIconClick }) => {
  return (
    <div className="WishListCard">
      <div className="WishListCardImage">
        <IKImage
          urlEndpoint={"https://ik.imagekit.io/hhdesai/Products/"}
          path={product.productName + "/" + product.productImageUrl[0] + ".jpg"}
        />
      </div>
      <div className="WishListCardDetails">
        <div className="WishListName">{product.productName}</div>
        <div className="WishListRating">
          Rating : <StarRating rating={product.productRating} />
        </div>
        <div className="WishListCost">Cost : Rs. {product.productCost}</div>
      </div>
      <div className="MenuConatiner">
        <DeleteIconButton onClick={onDeleteIconClick} />
      </div>
    </div>
  );
};

export const CartListCard = ({ product, onDeleteIconClick }) => {
  return (
    <div className="CartListCard">
      <div className="CartListCardImage">
        <IKImage
          urlEndpoint={"https://ik.imagekit.io/hhdesai/Products/"}
          path={product.productName + "/" + product.productImageUrl[0] + ".jpg"}
        />
      </div>
      <div className="CartListtCardDetails">
        <div className="CartListName">{product.productName}</div>
        <div className="CartListRating">
          Rating : <StarRating rating={product.productRating} />
        </div>
        <div className="CartListCost">Cost : Rs. {product.productCost}</div>
      </div>
      <div className="MenuConatiner">
        <DeleteIconButton onClick={onDeleteIconClick} />
      </div>
    </div>
  );
};

export const AddressCard = ({ address, onEdit, onDelete }) => {
  const fullAddress = `${address.homeNo}, ${address.streetLine1}, ${
    address.streetLine2 ? address.streetLine2 + "," : ""
  } ${address.city}, ${address.state} - ${address.postalCode}`;

  return (
    <div className="address-card">
      <div className="address-card-header">
        <FaMapMarkerAlt className="address-icon" />
        <span className="address-type-badge">{address.addressType}</span>
      </div>
      <div className="address-card-body">
        <p>{fullAddress}</p>
        <p>{address.country}</p>
      </div>
      <div className="address-card-actions">
        {/* --- FIX: Wrapped in arrow function --- */}
        <button className="address-action-btn" onClick={() => onEdit(address)}>
          <FaEdit /> <span>Edit</span>
        </button>
        {/* --- FIX: Wrapped in arrow function --- */}
        <button
          className="address-action-btn delete"
          onClick={() => onDelete(address)}
        >
          <FaTrash /> <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
