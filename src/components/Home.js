import React from 'react';
import BannerSlider from './BannerSlider';
import cat1 from "../../public/assets/img/cat1.webp";
import cat2 from "../../public/assets/img/cat2.webp";
import cat3 from "../../public/assets/img/cat3.webp";
import cat4 from "../../public/assets/img/cat4.webp";
import styles from "../../public/assets/styles/category.module.scss";
import ProductListing from "./ProductListing";
import Categories from './Categories';

const Home = () => {
    const categories = [
        {
          img: cat1,
          name: "electronics",
          id: 1,
        },
        {
          img: cat2,
          name: "jewelery",
          id: 2,
        },
        {
          img: cat3,
          name: "men's clothing",
          id: 3,
        },
        {
          img: cat4,
          name: "women's clothing",
          id: 4,
        },
      ];
    return (
        <div>
            <BannerSlider />
            <div className="pt-5 container">
            <h3 className="py-2">Shop by Caterogry</h3>
            <div className={`${styles.categoryWrapper}`}>
                {categories.map((Category) => {
                return (
                    <div key={Category.id}>
                    <div
                        className="category"
                        style={{
                        background: `linear-gradient(rgba(20,20,20, 0.3),rgba(20,20,20, .3)), url(${Category.img}) no-repeat`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        }}
                    >
                        <h5 className="text-white px-3">
                        {Category.name.toUpperCase()}
                        </h5>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
            <div id="product-list">
              <ProductListing />
            </div>
        </div>
    );
}
 
export default Home;