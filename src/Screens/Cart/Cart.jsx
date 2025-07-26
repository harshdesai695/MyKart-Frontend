import React, { useState, useContext, useEffect, useMemo } from "react";
import "./Cart.css";
import { AuthContext } from "../../Auth/AuthProvider";
import { getProduct } from "../../Controller/ProductController";
import { getCartList, deleteFromCartList } from "../../Controller/UserActivityController";
import { toastSuccess, toastError } from "../../Components/CustomComponents/Toast";
import { useNavigate } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import { FaTrashAlt } from 'react-icons/fa';

const Cart = () => {
  const { userId } = useContext(AuthContext);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();
  const deliveryCharges = cartList.length > 0 ? 100 : 0; // Set delivery charge

  // Fetch cart data on load
  useEffect(() => {
    fetchCartList();
  }, [userId]);

  const fetchCartList = async () => {
    if (!userId) return;
    try {
      const response = await getCartList(userId);
      const cartProductIds = response.data.cartList;
      if (cartProductIds && cartProductIds.length > 0) {
        // Create a map to count quantities of each product
        const quantityMap = cartProductIds.reduce((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});

        const uniqueProductIds = Object.keys(quantityMap);
        const productPromises = uniqueProductIds.map(id => getProduct(id));
        const productResults = await Promise.all(productPromises);

        const productsWithQuantities = productResults.map(res => ({
          ...res.data,
          quantity: quantityMap[res.data.productId],
        }));
        setCartList(productsWithQuantities);
      } else {
        setCartList([]);
      }
    } catch (error) {
      toastError("Could not load your cart.");
    }
  };
  
  // Memoized calculation for totals
  const { subtotal, totalAmount } = useMemo(() => {
    const sub = cartList.reduce((sum, item) => {
      const cost = parseFloat(item.productCost.toString().replace(/,/g, ""));
      return sum + cost * item.quantity;
    }, 0);
    return {
      subtotal: sub,
      totalAmount: sub + deliveryCharges,
    };
  }, [cartList, deliveryCharges]);


  const handleQuantityChange = (productId, delta) => {
    setCartList(currentList =>
      currentList.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0) // Optional: remove if quantity becomes 0
    );
    // Note: In a real app, you would also call an API to update the cart on the server.
  };

  const onDeleteProduct = async (productId) => {
    try {
      const response = await deleteFromCartList(userId, productId);
      if (response.status === 200) {
        toastSuccess("Product removed from cart");
        setCartList(currentList => currentList.filter(item => item.productId !== productId));
      }
    } catch (error) {
      toastError("Failed to remove product.");
    }
  };
  
  const onProductCardClick = (product) => {
    navigate("/ProductPage", { state: { productData: product } });
  };

  return (
    <div className="cart-page-container">
      <h1>Shopping Cart</h1>
      {cartList.length > 0 ? (
        <div className="cart-layout">
          {/* Left Column: Cart Items */}
          <div className="cart-items-column">
            {cartList.map((item) => (
              <div key={item.productId} className="cart-item-card">
                <IKImage
                  className="cart-item-image"
                  urlEndpoint={"https://ik.imagekit.io/hhdesai/Products/"}
                  path={`${item.productName}/${item.productImageUrl[0]}.jpg`}
                  onClick={() => onProductCardClick(item)}
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name" onClick={() => onProductCardClick(item)}>{item.productName}</h3>
                  <p className="cart-item-brand">Brand: {item.brandName}</p>
                  <div className="quantity-selector">
                    <button onClick={() => handleQuantityChange(item.productId, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.productId, 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-price-actions">
                   <p className="cart-item-price">₹{(parseFloat(item.productCost.toString().replace(/,/g, "")) * item.quantity).toLocaleString()}</p>
                   <button className="cart-item-delete-btn" onClick={() => onDeleteProduct(item.productId)}>
                     <FaTrashAlt />
                   </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-column">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              <div className="summary-line">
                <span>Subtotal ({cartList.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-line">
                <span>Discount</span>
                <span>- ₹0</span>
              </div>
              <div className="summary-line">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges.toLocaleString()}</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-line total">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty.</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button className="shop-now-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;