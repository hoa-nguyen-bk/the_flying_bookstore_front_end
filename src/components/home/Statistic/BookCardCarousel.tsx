import Image from "next/image";

import BookImg from "@/assets/images/book-cover_null.png";
import { Button } from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { formatCurrency } from "@/utils/helps";
import { IListing } from "@/types/book";

const BookCardCarousel = ({ book }: { book: IListing }) => {
  return (
    <div className="text-center mb-5">
      <Image
        src={book?.copy?.imageLink || BookImg}
        alt="Picture of the author"
        className="mx-auto bottom-0"
        width={128}
        height={230}
      />
      <h4 className="text-xl font-semibold py-3">{book?.book?.title || "Không có tiêu đề"}</h4>
      {book?.allowRent == 1 && (<p className="text-sm text-secondary">Thuê: {`${formatCurrency(book?.leaseRate)}/ngày` || "Không hợp lệ "}</p>)}
      {book?.allowPurchase == 1 && (<p className="pb-3 text-sm text-gray-500">Mua: {`${formatCurrency(book?.price)}` || "Không hợp lệ "}</p>)}
      <Link href={`/detail/${book?.id}`}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CiShoppingCart />}
          sx={{ color: "white", textTransform: "none" }}
        >
          Thêm vào giỏ hàng
        </Button>
      </Link>
    </div>
  );
};

export default BookCardCarousel;
