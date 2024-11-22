import React, { useEffect, useState, useContext } from "react";
import "./WishListPage.css";
import { AuthContext } from "../../Auth/AuthProvider";
import { getWishList } from "../../Controller/UserActivityController";
import { getProduct } from "../../Controller/ProductController";
import { WishListCard } from "../../Components/CustomComponents/Cards";
import { deleteFromWishList } from "../../Controller/UserActivityController";
import { toastSuccess } from "../../Components/CustomComponents/Toast";
import { useNavigate } from "react-router-dom";

const WishListPage = () => {
  const { userId } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);
  const [wishListLength, setWishListLength] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchWishList();
  }, [wishList]);

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

  const onDeleteProduct = async (productId) => {
    try {
      let response = await deleteFromWishList(userId, productId);
      if (response.status === 200) {
        toastSuccess("Product Removed From WishList");
      }
    } catch (error) {}
  };

  const onProductCardClick = (product) => {
    navigate("/ProductPage", { state: { productData: product } });
  };

  return (
    <center>
      <div className="WishListPage">
        <div className="WishListContainer">
          <div className="WishListHeader">My WishList {wishListLength}</div>

          <div className="WishListList">
            {wishList.length !== 0 ? (
              wishList.map((item) => (
                <div
                  key={item.productId}
                  onClick={() => onProductCardClick(item)}
                >
                  <WishListCard
                    product={item}
                    onDeleteIconClick={(event) => {
                      event.stopPropagation();
                      onDeleteProduct(item.productId);
                    }}
                  />
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
