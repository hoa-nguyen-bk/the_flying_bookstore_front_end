import React from "react";
import Slider from "react-slick";
import Category from "./Category";

const BookCategory = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "60px",
  };
  const slides = [1,2,3,4,5,6,7,8,9];

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-3xl pt-8 pb-5 font-semibold text-center">
        Danh mục sản phẩm
      </h3>
      <Slider {...settings}>
          {slides.map(slide => <Category key={slide}/>)}
        </Slider>
    </div>
  );
};

export default BookCategory;