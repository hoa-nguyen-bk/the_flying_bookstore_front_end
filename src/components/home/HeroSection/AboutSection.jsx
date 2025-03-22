import "./HeroSection.scss";
import AboutImage from "./../../../assets/images/teenage-girl.png";
import BackgroundBanner from "./../../../assets/images/backgroud-banner.svg";
import Image from "next/image";
import { Chip } from "@mui/material";

export default function AboutPage() {
  return (
    <section className="hero container mx-auto lg:px-10 xl:px-14 xxl:px-0">
      <div className="grid grid-cols-2 gap-4">
        
        <div className="max-w-2xl py-12 sm:py-32 lg:py-48">
        <p className="text-lg sellest text-secondary mb-6">GIỚI THIỆU</p>
          <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Về Flying Bookstore
            </h1>
            <div className="description border-l-2">
              <p className="ml-5 mt-6 text-lg leading-8 text-gray-600">
                Flying Bookstore là nền tảng cho thuê sách trực tuyến hàng đầu, giúp bạn tiếp cận hàng nghìn đầu sách với chi phí hợp lý. Chúng tôi cam kết mang đến trải nghiệm đọc sách tuyệt vời nhất!
              </p>
              <p className="ml-5 mt-4 text-lg leading-8 text-gray-600">
                Được thành lập vào năm 2020, Flying Bookstore đã phục vụ hơn 50.000 khách hàng trên khắp cả nước, cung cấp không chỉ sách in mà còn cả ebook và audiobook.
              </p>
            </div>
            <div className="my-10 flex items-center justify-start gap-x-6">
              <a
                href="https://www.vng.com.vn/?ref=thevc"
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Khám phá ngay
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Xem chi tiết
              </a>
            </div>
            <div className="flex items-center">
              <h3 className="text-3xl font-bold sm:text-4xl">Hơn 50.000 khách hàng</h3>
              <span className="text-base text-primary mx-5">Trải nghiệm tuyệt vời</span>
              <Chip color="success" label="Được đánh giá 5 sao" />
            </div>
          </div>
        </div>
        
        {/* <div className="relative h-full">
          <Image
            src={AboutImage}
            alt="About Flying Bookstore"
            className="absolute bottom-0 w-10/12"
            priority
          />
        </div> */}
        
        <div className="absolute top-0 -z-10 w-10/12 overflow-hidden">
          <Image src={BackgroundBanner} alt="Background" priority />
        </div>
      </div>
    </section>
  );
}
