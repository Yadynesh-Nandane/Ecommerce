import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { allProducts, clearErrors } from "../actions/productActions";

const Products = () => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(allProducts());
  }, [dispatch, error]);

  return (
    <div className="w-full h-full flex flex-col my-4">
      {products?.allProducts?.map((product, i) => (
        <Link
          to={`product/${product._id}`}
          key={product._id}
          className="w-auto h-auto flex  border-2 my-2 mx-4"
        >
          <div className="w-2/5 h-full py-10 px-4">
            <img
              src={product.images[0]}
              alt="image apple"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-3/5 h-full py-4 px-2">
            <h2>{product.title}</h2>
            <p className="my-2">Stars</p>
            <h3 className="text-2xl my-2">{product.price}</h3>
            <p className="my-2">{product.category?.product_category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;

{
  /* <div className="w-auto h-auto flex  border-2 my-2 mx-4">
  <div className="w-2/5 h-full py-10 px-4">
    <img
      src="https://m.media-amazon.com/images/I/71ZyBh4LQuL._AC_UL320_.jpg"
      alt="image apple"
      className="w-full h-full object-contain"
    />
  </div>
  <div className="w-3/5 h-full py-4 px-2">
    <h2>
      Samsung IPS, Bezel Less, Flat, Flicker Free 1920 x 1080 Pixels LED
      Monitor-(Dark Blue Gray)
    </h2>
    <p className="my-2">Stars</p>
    <h3 className="text-2xl my-2">Price</h3>
    <p className="my-2">Electronics</p>
  </div>
</div>; */
}
