import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { userSingleProduct, clearErrors } from "../actions/productActions";
import Loader from "../components/Loader";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.singleProduct
  );

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(userSingleProduct(id));
  }, [dispatch, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          ProductDetailsPage
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
