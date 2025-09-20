import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../Components/CustomComponents/ProductCard"; // Using your original ProductCard
import { getProducts } from "../../Controller/ProductController";
import { SkeletonProductLoader } from "../../Components/CustomComponents/SkeletonLoader";
// import { IKImage } from "imagekitio-react";
import {BrandCard } from "../../Components/CustomComponents/Cards"; // Importing the new Card components




const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Updated topBrands to include image file names
  const topBrands = {
    Logitech: { slogan: "Gear up for greatness.", img: "Logitech.png" },
    Razer: { slogan: "For gamers, by gamers.", img: "Razer.png" },
    Redragon: { slogan: "Ignite your passion.", img: "Redragon.png" },
    AsusROG: { slogan: "Dominate the game.", img: "AsusROG.png" },
    Corsair: { slogan: "Power your play.", img: "Corsair.png" },
    Alienware: { slogan: "Game without limits.", img: "Alienware.png" },
    AntEsports: { slogan: "Game on a new level.", img: "AntEsports.png" },
    Steelseries: { slogan: "Precision engineered.", img: "Steelseries.png" },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.success) {
          setProducts(response.data); 
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const onBrandClick = (brand) => {
    navigate("/SearchPage", { state: { brandName: brand } });
  };

  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-prefix">
          <span>Welcome To MyKart</span>
          <span>Your One-Stop Gaming Shop</span>
        </div>
      </div>

      <main className="home-content-container">
        {/* Best Deals Section */}
        <section className="home-section">
          <h2 className="section-header">Today's Best Deals</h2>
          <div className="product-grid">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => <SkeletonProductLoader key={index} />)
              : products.map((item) => (
                  // Using your original ProductCard component
                  <ProductCard key={item.productId} product={item} />
                ))}
          </div>
        </section>

        {/* Top Brands Section */}
        <section className="home-section">
            <h2 className="section-header">Shop by Top Brands</h2>
            <div className="brand-grid">
                {Object.entries(topBrands).map(([brand, data]) => (
                    <BrandCard
                        key={brand}
                        brandName={brand}
                        slogan={data.slogan}
                        imageUrl={data.img}
                        onClick={() => onBrandClick(brand)}
                    />
                ))}
            </div>
        </section>
      </main>
    </div>
  );
};

export default Home;