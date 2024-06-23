import React from "react";
import { useDispatch } from "react-redux";
import { Link , redirect } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import "./ProductItem.scss";

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
 
  return (
    <div className="product-list">
     
      <Link to={`/product-details/${id}`}>
        <div className="product-list__img">
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className="product-list__content">
     
        <button
            className="addtocartBtn"
            onClick={() => addToCart(product)}
          >
            Add To Cart
        </button>
          <div className="product-list__details">
          <p className="product-list__title">{shortenText(name, 18)}</p>
          <p className="product-list__title product-list__title--price">{`₹${price
            .toString()
            .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}`}</p>
        </div>
        {!grid && <p className="product-list__desc">{shortenText(desc, 30)}</p>}
      </div>
    </div>
  );
};

export default ProductItem;
