import React, { useState, useContext, useEffect } from "react";
import "./Cart.css";
import { AuthContext } from "../../Auth/AuthProvider";
import { CartListCard } from "../../Components/CustomComponents/Cards";
import { getProduct } from "../../Controller/ProductController";
import {
  getCartList,
  deleteFromCartList,
} from "../../Controller/UserActivityController";
import { PrimaryButton } from "../../Components/CustomComponents/CustomButtons";
import { toastSuccess } from "../../Components/CustomComponents/Toast";

const Cart = () => {
  const { userId } = useContext(AuthContext);
  const [cartList, setCartList] = useState([]);
  const [cartListLength, setcartListLength] = useState(0);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    fetchcartList();
  }, [cartList]);

  const fetchcartList = async () => {
    const response = await getCartList(userId);
    const cartLst = response.data.cartList;
    let productList = await getProducts(cartLst);
    setcartListLength(cartLst.length);
    setTotalCartValue(
      productList.reduce((sum, product) => {
        const cost = parseFloat(product.productCost.replace(/,/g, ""));
        return sum + cost;
      }, 0)
    );
    setDiscount(0);
    setDeliveryCharges(100);
    setCartList(productList);
  };

  const getProducts = async (cartLst) => {
    try {
      const productList = await Promise.all(
        Object.entries(cartLst).map(async ([key, cartlistItem]) => {
          const productResult = await getProduct(cartlistItem);
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
      let response = deleteFromCartList(userId, productId);
      if (response.status === 200) {
        toastSuccess("Product Removed From Cart");
      }
    } catch (error) {}
  };

  return (
    <center>
      <div className="CartListPage">
        <div className="CartListContainer">
          <div className="CartListHeader">Shopping Cart</div>
          <div className="CartListList">
            {cartList.map((item) => (
              <div key={item.productId}>
                <CartListCard
                  product={item}
                  onDeleteIconClick={() => onDeleteProduct(item.productId)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="CartvalueConatiner">
          <div className="CartValueHeader">Cart Details</div>
          <div className="CartValueDetails">
            <div className="CartValueDetaisItem">
              <span>Price({cartListLength} items)</span>
              <span>{totalCartValue}</span>
            </div>
            <div className="CartValueDetaisItem">
              <span>Discount</span>
              <span>{discount}</span>
            </div>
            <div className="CartValueDetaisItem">
              <span>Delivery Charges</span>
              <span>{deliveryCharges}</span>
            </div>
            <div className="CartValueDetaisItem">
              <span>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - - -
              </span>
            </div>
            <div className="CartValueDetaisItem">
              <span>
                <b>Total Amount</b>
              </span>
              <span>{totalCartValue + deliveryCharges}</span>
            </div>
          </div>

          <div className="Checkout">
            <PrimaryButton lable={"Checkout"} />
          </div>
        </div>
      </div>
    </center>
  );
};

export default Cart;
