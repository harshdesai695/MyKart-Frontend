import React from "react";
import "./Home.css";
import { ProductCard } from "../../Components/CustomComponents/ProductCard";
import { useState, useEffect } from "react";
import { getProducts } from "../../Controller/ProductController";
import Loader from "../../Components/CustomComponents/Loader";
import { ImageCard } from "../../Components/CustomComponents/Cards";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const topBrand = {
    Logitech: "Gear up for greatness.",
    Razer: "For gamers, by gamers.",
    Redragon: "Ignite your gaming passion.",
    "Asus ROG": "Dominate the game.",
    Corsair: "Power your play.",
    AlienWare: "Game without limits.",
    "Ant Esports": "Game on a new level.",
    Steelseries: "Precision engineered",
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let response = null;
      response = await getProducts();
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBrandClick = (brand) => {
    navigate("/SearchPage", { state: { brandName: brand } });
  };

  return (
    <div className="Home-Container">
      <div className="banner">
        <div className="banner-prefix">
          <span>Welcome To GameKart</span>
          <span>One Stop Shop For Your Gaming Needs</span>
        </div>
      </div>

      <div className="bestDeals">
        <span className="bestDealsSpan"> Best Deals For Toady</span>
        <div className="bestDealList">
          {products != null ? (
            products.map((item) => <ProductCard product={item} />)
          ) : (
            <Loader />
          )}
        </div>
      </div>

      <div className="TopBrands">
        <span className="TopBrandsSpan"> Top Brands</span>
        <div className="TopBrandsList">
          {Object.entries(topBrand).map(([brand, slogan]) => (
            <ImageCard
              imageName={brand}
              imageDescription={slogan}
              onclick={() => onBrandClick(brand)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
