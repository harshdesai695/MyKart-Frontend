import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductByBrandName } from "../../Controller/ProductController";
import { ProductCard } from "../../Components/CustomComponents/ProductCard";
// import Loader from "../../Components/CustomComponents/Loader";
import { SkeletonProductLoader } from "../../Components/CustomComponents/SkeletonLoader";
import "./SearchPage.css";

const SearchPage = () => {
  const location = useLocation();
  const [product, setproduct] = useState(null);
  const [isloding, setIsLoding] = useState(true);
  const { state } = location;
  useEffect(() => {
    getProductbyBrand();
  }, [state.brandName]);

  const getProductbyBrand = async () => {
    let response = null;
    response = await getProductByBrandName(state.brandName);
    if (response.status === 200) {
      setproduct(response.data);
      setIsLoding(false);
    }
  };

  return (
    <div className="SearchPageMainContainer">
      <div className="ProductMainContainer">
        {isloding
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProductLoader key={index} />
            ))
          : product.map((item) => (
              <div className="ProductContainer">
                <ProductCard product={item} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default SearchPage;
