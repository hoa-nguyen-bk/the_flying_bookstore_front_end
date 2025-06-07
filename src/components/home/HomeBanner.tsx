"use-client";
import Slider from "react-slick";
import AboutPage from "./HeroSection/AboutSection";
import PromotionSection from "./HeroSection/PromotionSection";
import HeroSection from "./HeroSection/HeroSection";
export default function HomeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
      <div className="banner" id="banner0">
          <AboutPage />
        </div>
        <div className="banner" id="banner1">
          <HeroSection />
        </div>
        <div className="banner" id="banner2">
          <PromotionSection />
        </div>
      </Slider>
    </div>
  );
}
