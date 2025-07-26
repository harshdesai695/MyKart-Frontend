import React, { useEffect, useState, useContext } from "react";
import "./WishListPage.css";
import { AuthContext } from "../../Auth/AuthProvider";
import { getWishList, deleteFromWishList, addToCartList } from "../../Controller/UserActivityController";
import { getProduct } from "../../Controller/ProductController";
import { toastSuccess, toastError } from "../../Components/CustomComponents/Toast";
import { useNavigate } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import StarRating from "../../Components/CustomComponents/Rating";
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa'; // Using icons for actions

const WishListPage = () => {
  const { userId } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  // Fetch the wishlist and product details on component mount
  useEffect(() => {
    fetchWishList();
  }, [userId]); // Re-fetch if userId changes

  const fetchWishList = async () => {
    if (!userId) return;
    try {
      const response = await getWishList(userId);
      const wishlistProductIds = response.data.wishList;
      if (wishlistProductIds && wishlistProductIds.length > 0) {
        const productPromises = wishlistProductIds.map(id => getProduct(id));
        const productResults = await Promise.all(productPromises);
        setWishList(productResults.map(res => res.data));
      } else {
        setWishList([]); // Clear wishlist if it's empty
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toastError("Could not load your wishlist.");
    }
  };

  const onDeleteProduct = async (productId) => {
    try {
      const response = await deleteFromWishList(userId, productId);
      if (response.status === 200) {
        toastSuccess("Product removed from wishlist");
        // Update state directly for a faster UI response
        setWishList(currentList => currentList.filter(item => item.productId !== productId));
      }
    } catch (error) {
      toastError("Failed to remove product.");
    }
  };
  
  const onAddToCart = async (productId) => {
    try {
        await addToCartList(userId, productId);
        toastSuccess("Product added to cart!");
    } catch (error) {
        toastError("Could not add product to cart.");
    }
  };

  const onProductCardClick = (product) => {
    navigate("/ProductPage", { state: { productData: product } });
  };

  return (
    <div className="wishlist-page-container">
      <h1>
        My Wishlist
        <span className="item-count">({wishList.length} items)</span>
      </h1>

      {wishList.length > 0 ? (
        <div className="wishlist-grid">
          {wishList.map((product) => (
            <div key={product.productId} className="wishlist-item-card">
              <div className="card-actions">
                 <button className="action-btn add-to-cart-btn" title="Add to Cart" onClick={(e) => { e.stopPropagation(); onAddToCart(product.productId); }}>
                    <FaShoppingCart />
                 </button>
                 <button className="action-btn delete-btn" title="Remove from Wishlist" onClick={(e) => { e.stopPropagation(); onDeleteProduct(product.productId); }}>
                    <FaTrashAlt />
                 </button>
              </div>

              <div className="card-clickable-area" onClick={() => onProductCardClick(product)}>
                <IKImage
                  className="wishlist-item-image"
                  urlEndpoint={"https://ik.imagekit.io/hhdesai/Products/"}
                  path={`${product.productName}/${product.productImageUrl[0]}.jpg`}
                />
                <div className="wishlist-item-details">
                  <h3 className="wishlist-item-name">{product.productName}</h3>
                  <div className="wishlist-item-rating">
                    <StarRating rating={product.productRating} />
                  </div>
                  <p className="wishlist-item-cost">₹{product.productCost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <button className="shop-now-btn" onClick={() => navigate("/")}>
            Find Items to Add
          </button>
        </div>
      )}
    </div>
  );
};

export default WishListPage;