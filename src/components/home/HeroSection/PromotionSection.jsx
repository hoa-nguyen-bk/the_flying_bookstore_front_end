import Image from "next/image";
import BackgroundBanner from "./../../../assets/images/backgroud-banner.svg";
import PromoImage from "./../../../assets/images/background.jpg";
import { Chip } from "@mui/material";

export default function PromotionSection() {
  return (
    <section className="promo-section container mx-auto lg:px-10 xl:px-14 xxl:px-0">
      <div className="grid grid-cols-2 gap-8 py-12 sm:py-32 lg:py-48 relative">
        <div className="max-w-2xl">
          <p className="text-lg font-semibold text-secondary mb-6">KHUYẾN MÃI ĐẶC BIỆT</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Ưu đãi hấp dẫn tháng này!
          </h1>
          <p className="border-l-2 pl-5 mt-6 text-lg text-gray-600">
            Nhận ngay ưu đãi <span className="text-red-500 font-semibold">giảm đến 50%</span> khi thuê sách trên Flying Bookstore. Áp dụng cho các thể loại sách HOT nhất hiện nay.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Nhanh tay đặt sách ngay hôm nay để tận hưởng ưu đãi siêu hấp dẫn!
          </p>
          <div className="my-10 flex gap-x-6">
            <a href="#" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Nhận ưu đãi ngay
            </a>
          </div>
          <div className="flex items-center">
            <Chip color="error" label="Ưu đãi có hạn" />
            <span className="text-lg text-primary ml-5">Chỉ áp dụng đến hết tháng!</span>
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center">
  <div className="relative h-full flex flex-col items-center">
  <Image
    src={PromoImage}
    alt="Sách khuyến mãi"
    className="w-9/12 rounded-lg shadow-lg"
    priority
  />
    <div className="mt-4 text-center">
    <div className="px-4 py-2 bg-red-500 text-white font-semibold text-lg rounded-lg inline-block">
      Giảm 20%
    </div>
    <div className="mt-2 text-lg font-medium text-gray-600">
      <span className="line-through mr-2">100.000đ</span>
      <span className="text-red-500 font-bold">80.000đ</span>
    </div>
  </div>
</div>

</div>

      </div>

      {/* Background giữ nguyên */}
      <div className="absolute top-0 -z-10 w-full overflow-hidden">
        <Image src={BackgroundBanner} alt="Background" priority className="w-full object-cover" />
      </div>
    </section>
  );
}