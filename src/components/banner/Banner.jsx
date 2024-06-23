import React from "react";
import "./Banner.scss";
import hero from "../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__text">
        <h2>
        Looking for laptops in Nepal?
        </h2>
        <p>
        Exclusive is your go-to laptop store in Nepal that offers the best laptops and laptop accessories in Nepal from brands like Apple, Asus, Lenovo, HP, Dell, and more. Visit our shop to purchase the best laptop in Nepal
        </p>
        <a href="#product" className="shopBtn">
          Shop now
        </a>
      </div>
      <div className="banner__image">
        <img src={hero} alt="furniture" width="500px" />
      </div>
    </div>
  );
};

export default Banner;
