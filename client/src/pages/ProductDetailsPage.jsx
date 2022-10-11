import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { BiRupee } from "react-icons/bi";
import StarRatings from "react-star-ratings";

import Header from "../components/Header";
import { userSingleProduct, clearErrors } from "../actions/productActions";
import Loader from "../components/Loader";
import NavMenu from "../components/NavMenu";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.singleProduct
  );
  const { toggleMenu } = useSelector((state) => state.toggle);

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
      ) : toggleMenu ? (
        <NavMenu />
      ) : (
        <>
          <Header />
          <main className="w-full h-full font-poppins px-5 py-10">
            <div className="flex flex-col ">
              <div className="flex  items-center my-5">
                <Swiper
                  loop={true}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Pagination, Autoplay]}
                >
                  {product?.singleProduct?.images.map((image, i) => (
                    <SwiperSlide key={i}>
                      <img src={image} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="">
                <h1 className="text-3xl font-sans font-medium py-2">
                  {product?.singleProduct?.title}
                </h1>
                <div className="py-4">
                  <StarRatings
                    starDimension="30px"
                    starRatedColor="#FFA41C"
                    rating={product?.singleProduct?.finalRating}
                  />
                </div>
                <div className="flex items-center py-4">
                  <BiRupee size={40} />
                  <p className="text-4xl font-sans">
                    {product?.singleProduct?.price.toLocaleString("hi-IN")}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
