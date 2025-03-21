"use client";
import Slider from "react-slick";
import Category from "./Category";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useGenreStore } from "@/hooks/genre";
export const responsiveSlick = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true
    }
  },];

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: "60px",
  lazyLoad: "ondemand" as "ondemand", // Lazy load ảnh
  responsive: responsiveSlick
};
const BookCategory = () => {
  const { listGenre: listCategory } = useGenreStore();
  const fetchGenre = useGenreStore(state => state.fetch);
  useEffect(() => {
    fetchGenre();
  }, [fetchGenre])

  const renderCategory = useCallback(
    () => {
      if (!listCategory || !Array.isArray(listCategory) || listCategory.length == 0) return <p className="text-center"> </p>;
      return (
        <Slider {...settings}>
          {listCategory.slice(0, 20).map((category, index) => (
            <Category category={category} key={index} />
          ))}
        </Slider>
      );
    },
    [listCategory] // Include 'settings' in the dependency array
  );

  return (
    <div className="container mx-auto mt-10 mb-24 overflow-hidden">
      <h3 className="text-3xl pt-8 pb-10 font-semibold text-center">
        Danh mục sản phẩm
      </h3>
      {renderCategory()}
    </div>
  );
};

export default BookCategory;
