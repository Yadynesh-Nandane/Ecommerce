import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { Rating } from "@mui/material";

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
          className="w-full h-[200px] flex items-center first:border-b-2  my-4 first:my-0 last:my-0"
        >
          <div className="w-[220px] h-full flex items-center">
            <img
              src={product?.images[0]}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full h-full flex flex-col justify-start pr-3">
            <h4 className="mt-5">
              {product?.title}, {product?.color}
            </h4>
            <div className="flex items-center mt-1">
              <Rating
                value={product?.finalRating}
                size="small"
                style={{ borderColor: "#FFA41C" }}
                precision={0.5}
                max={5}
                readOnly
              />
              <span className="ml-2">{product?.totalReviews}</span>
            </div>
            <div className="flex items-start relative mt-2">
              <span className="absolute top-1.5">
                <BiRupee />
              </span>
              <span className="text-2xl ml-3 font-semibold">
                {product?.price.toLocaleString("hi-IN")}
              </span>
            </div>
            <div className="mt-2">
              <span>
                Brand {"   "} - {product?.category?.product_subcategory}{" "}
              </span>
            </div>
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
