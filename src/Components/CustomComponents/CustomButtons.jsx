import React from "react";
import "./CustomButtons.css";
import { SvgArraw, SvgProfile, EditIcon, DeleteIcon } from "./SvgComponents";

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
      <svg
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20.503"
        height="20.625"
        viewBox="0 0 17.503 15.625"
      >
        <path
          id="Fill"
          d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
          transform="translate(0 0)"
        ></path>
      </svg>
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
