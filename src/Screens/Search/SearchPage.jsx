import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductByBrandName } from "../../Controller/ProductController";
import { ProductCard } from "../../Components/CustomComponents/ProductCard";
import Loader from "../../Components/CustomComponents/Loader";
import "./SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const [product, setproduct] = useState([]);
  const { state } = location;
  useEffect(() => {
    getProductbyBrand();
  });

  const getProductbyBrand = async () => {
    let response = null;
    response = await getProductByBrandName(state.brandName);
    if (response.status === 200) {
      setproduct(response.data);
    }
  };

  return (
    <div className="SearchPageMainContainer">
      <div className="ProductMainContainer">
        {product != null ? (
          product.map((item) => (
            <div className="ProductContainer">
              <ProductCard product={item} />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
