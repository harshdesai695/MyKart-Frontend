import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getProductByBrandName,
  searchProducts,
} from "../../Controller/ProductController";
import { ProductCard } from "../../Components/CustomComponents/ProductCard";
// import Loader from "../../Components/CustomComponents/Loader";
import { SkeletonProductLoader } from "../../Components/CustomComponents/SkeletonLoader";
import "./SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState([]); // Initialize as array
  const [isloding, setIsLoding] = useState(true);
  const { state } = location;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoding(true);
      setProduct([]); // Reset previous results
      
      let response = null;
      
      try {
        if (state?.brandName) {
          response = await getProductByBrandName(state.brandName);
        } else if (state?.keyword) {
          // New logic for Keyword Search
          response = await searchProducts(state.keyword);
        }

        if (response && response.success) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Search Page Error:", error);
      } finally {
        setIsLoding(false);
      }
    };

    if (state?.brandName || state?.keyword) {
        fetchData();
    }
  }, [state?.brandName, state?.keyword]);

  return (
    <div className="SearchPageMainContainer">
      <div className="ProductMainContainer">
        {isloding
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProductLoader key={index} />
            ))
          : product && product.length > 0 ? (
              product.map((item) => (
                <div className="ProductContainer" key={item.productId}>
                  <ProductCard product={item} />
                </div>
              ))
            ) : (
              // Optional: Fallback layout if no results, preserving container structure
              <div className="ProductContainer" style={{ color: 'white', width: '100%', textAlign: 'center' }}>
                <h3>No products found.</h3>
              </div>
            )
        }
      </div>
    </div>
  );
};

export default SearchPage;