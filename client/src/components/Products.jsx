import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import StarRatings from "react-star-ratings";

import { allProducts, clearErrors } from "../actions/productActions";

const Products = () => {
  const dispatch = useDispatch();

  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(allProducts());
  }, [dispatch, error]);

  return (
    <div className="w-full h-full flex flex-col font-poppins" id="container">
      {products?.allProducts?.map((product) => (
        <Link
          to={`product/${product?._id}`}
          key={product?._id}
          className="w-auto h-auto flex  border-2 my-4 first:my-0 last:my-0"
        >
          <div className="w-2/5 h-full py-10 px-4">
            <img
              src={product?.images[0]}
              alt="image apple"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-3/5 h-full py-4 px-2">
            <h2 className="text-xl font-semibold">{product?.title}</h2>
            <div className="my-3">
              <StarRatings
                starDimension="20px"
                starRatedColor="#FFA41C"
                rating={product?.finalRating}
              />
            </div>
            <div className="flex items-center text-2xl font-bold my-2">
              <BiRupee />
              {product?.price.toLocaleString("hi-IN")}
            </div>
            <p className="text-sm my-2">
              {product?.category?.product_category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
