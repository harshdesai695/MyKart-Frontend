import React from "react";
import "./CustomButtons.css";
import {
  SvgArraw,
  SvgProfile,
  EditIcon,
  DeleteIcon,
  WishListButton,
} from "./SvgComponents";

export const PrimaryButton = ({ lable, className, onClick }) => {
  return (
    <div className="button-borders">
      <button className={className || "primary-button"} onClick={onClick}>
        {" "}
        {lable}
      </button>
    </div>
  );
};

export const WishList = ({ onClick }) => {
  return (
    <button className="WishList" onClick={onClick}>
      <WishListButton />
    </button>
  );
};

export const EditIconButton = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <EditIcon />
    </button>
  );
};

export const DeleteIconButton = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <DeleteIcon />
    </button>
  );
};

export const ProductCardButton = ({ lable, onClick }) => {
  return (
    <button onClick={onClick}>
      <p className="fancy">
        <span className="top-key"></span>
        <span className="text">{lable}</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </p>
    </button>
  );
};

export const DropDownButton = ({ menuItems, onClick }) => {
  return (
    <div className="menu">
      <div className="item">
        <div className="link">
          <SvgProfile />
          <SvgArraw />
        </div>
        <div className="submenu">
          {menuItems.map((item) => (
            <div key={item} className="submenu-item">
              <button
                id={item}
                onClick={() => onClick(item)}
                className="submenu-link"
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
