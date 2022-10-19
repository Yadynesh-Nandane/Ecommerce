import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import StarRatings from "react-star-ratings";

import { allProducts, clearErrors } from "../actions/productActions";

const Products = () => {
  const dispatch = useDispatch();

  const { products, error } = useSelector((state) => state.products);
  const { toggleMenu } = useSelector((state) => state.toggle);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(allProducts());
  }, [dispatch, error]);

  return (
    <div className="w-full h-full flex flex-col border-b-2 " id="container">
      {products?.allProducts?.map((product) => (
        <Link
          to={`product/${product?._id}`}
          key={product?._id}
          className="w-full h-auto flex items-center first:border-b-2  my-4 first:my-0 last:my-0"
        >
          <div className="w-2/5 h-[220px] flex items-center">
            <img
              src={product?.images[0]}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h4>{product?.title}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;

{
  /* <div className="w-2/5 h-full py-10 px-4">
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
          </div> */
}
