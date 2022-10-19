import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { Rating } from "@mui/material";
import { BiRupee } from "react-icons/bi";

import "swiper/css";
import "swiper/css/pagination";

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
          <main className="w-full h-full flex flex-col ">
            <div className="w-full h-full flex flex-col p-4">
              <div className="w-full h-full flex flex-col items-start  leading-5  mb-4">
                <div className="w-full h-full flex justify-between items-center">
                  <div className="text-sky-600 text-sm">
                    Brand: {"  "}
                    {product?.singleProduct?.brand}
                  </div>
                  <div className="h-full flex items-start">
                    <Rating
                      value={product?.singleProduct?.finalRating}
                      size="small"
                      style={{ borderColor: "#FFA41C" }}
                      precision={0.5}
                      max={5}
                      readOnly
                    />
                    <span className="text-sm text-sky-600 font-semibold ml-2">
                      {product?.singleProduct?.totalReviews.toLocaleString(
                        "hi-IN"
                      )}
                    </span>
                  </div>
                </div>
                <h4 className="">
                  {product?.singleProduct?.title} -{" "}
                  {product?.singleProduct?.color}
                </h4>
              </div>
              <div className="">
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
                    <SwiperSlide key={image}>
                      <img src={image} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="">
              <div className="text-xl border-b-4 p-4">
                <span className="mr-2">Price:</span>
                <span className="font-semibold">
                  {product?.singleProduct?.price.toLocaleString("hi-IN")}
                </span>
              </div>
              <div className=" border-b-4 p-4">
                <h3></h3>
                <select>
                  <option value="1">Qty: 1</option>
                  <option value="2">Qty: 2</option>
                  <option value="3">Qty: 3</option>
                  <option value="4">Qty: 4</option>
                </select>
                <div className="">Add to Cart</div>
                <div className="">Buy Now</div>
                <div className="">
                  Sold by this this this and Fulfilled by Amazon
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">Product details</h2>
                <ul className="ml-4 mt-4">
                  {product?.singleProduct?.features.map((feature, i) => (
                    <li key={i} className="list-disc">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
{
  /* <div className="flex flex-col ">
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
</div>; */
}
