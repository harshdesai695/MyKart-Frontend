import React from "react";
import './cards.css'
import StarRating from "./Rating";

export const ImageCard = ({ imageName, imageDescription }) => {
    return (
        <div className="Image-Card">
            <div className="ImageBox">
                <img src={imageName + ".png"} alt="" />
            </div>
            <div className="ImageContent">
                <h2>{imageName}</h2>
                <p>{imageDescription}</p>
            </div>
        </div>
    )
}


export const WishListCard = ({ product }) => {
    return (
        <div className="WishListCard">
            <div className="WishListCardImage">
                <img src={product.productImageUrl[0]} alt={product.productImageUrl[0]} />
            </div>
            <div className="WishListCardDetails">
                <div className="WishListName">{product.productName}</div>
                <div className="WishListRating">Rating : <StarRating rating={product.productRating} /></div>
                <div className="WishListCost">Cost : Rs. {product.productCost}</div>
            </div>
        </div>
    )
}


export const CartListCard = ({ product }) => {
    return (
        <div className="CartListCard">
            <div className="CartListCardImage">
                <img src={product.productImageUrl[0]} alt={product.productImageUrl[0]} />
            </div>
            <div className="CartListtCardDetails">
                <div className="CartListName">{product.productName}</div>
                <div className="CartListRating">Rating : <StarRating rating={product.productRating} /></div>
                <div className="CartListCost">Cost : Rs. {product.productCost}</div>
            </div>
        </div>)
}