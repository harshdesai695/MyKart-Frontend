import React, { useEffect, useState, useContext } from "react";
import "./WishListPage.css";
import { AuthContext } from "../../Auth/AuthProvider";
import { getWishList } from "../../Controller/UserActivityController";
import { getProduct } from "../../Controller/ProductController";
import { WishListCard } from "../../Components/CustomComponents/Cards";

const WishListPage = () => {
  const { userId } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);
  const [wishListLength, setWishListLength] = useState(0);

  useEffect(() => {
    fetchWishList();
  });

  const fetchWishList = async () => {
    const response = await getWishList(userId);
    const wsLst = response.data.wishList;
    let productList = await getProducts(wsLst);
    setWishListLength(wsLst.length);
    setWishList(productList);
  };

  const getProducts = async (wishLst) => {
    try {
      const productList = await Promise.all(
        Object.entries(wishLst).map(async ([key, wishlistItem]) => {
          const productResult = await getProduct(wishlistItem);
          return productResult.data;
        })
      );
      return productList;
    } catch (error) {
      console.error("Error in getProducts:", error);
      return [];
    }
  };

  return (
    <center>
      <div className="WishListPage">
        <div className="WishListContainer">
          <div className="WishListHeader">My WishList {wishListLength}</div>

          <div className="WishListList">
            {wishList.length !== 0 ? (
              wishList.map((item) => (
                <div key={item.productId}>
                  <WishListCard product={item} />
                </div>
              ))
            ) : (
              <div>Empty WishList</div>
            )}
          </div>
        </div>
      </div>
    </center>
  );
};

export default WishListPage;
