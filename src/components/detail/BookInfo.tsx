import Image from "next/image";
import { Button, IconButton, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { TfiComments } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa6";
import { FaRegShareSquare } from "react-icons/fa";
import BookGallery from "./BookGallery";
import { AiFillThunderbolt } from "react-icons/ai";
import { LuShieldCheck } from "react-icons/lu";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiHashtag } from "react-icons/ci";
import Quality from "./Quality";
import { IListing } from "@/types/book";
import {
  arrayToString,
  countAvarageReview,
  formatCurrency,
} from "@/utils/helps";
import Link from "next/link";
import dayjs from "dayjs";
import { useGenreStore } from "@/hooks/genre";
import { ICategory } from "@/types/category";
import { useRouter } from "next/navigation";
import { useStoreSearch } from "@/hooks/search";

const BookInfo = ({ book }: { book: IListing | undefined }) => {
  const listCategory = useGenreStore((state) => state.listGenre);
  const { updateCategoryParam } = useStoreSearch();
  const router = useRouter();
  const getVietnameseNames = () => {
    if (!listCategory) return [];
    // Tạo một mảng để lưu tên tiếng Việt của các phần tử cần tìm
    const vietnameseNames: Array<ICategory> = [];

    // Duyệt qua mảng data
    book?.book?.genre.forEach((item) => {
      // Kiểm tra nếu tên của phần tử có trong mảng itemNames
      const isFind = listCategory.find((category) => category.name == item);
      if (isFind) vietnameseNames.push(isFind);
    });

    // Trả về mảng chứa tên tiếng Việt của các phần tử tương ứng
    return vietnameseNames;
  };
  const onNavigate = (category: ICategory) => {
    updateCategoryParam(category);
    router.push("/search");
  };
  const renderCategory = () => {
    const listVietnameseCategory = getVietnameseNames();
    return listVietnameseCategory.slice(0, 3).map((item, index) => {
      return (
        <Button
          variant="outlined"
          onClick={() => onNavigate(item)}
          startIcon={<CiHashtag />}
          key={index}
        >
          {item.nameVn}
        </Button>
      );
    });
  };

  return (
    <div className="flex gap-10 flex-row">
      <div className="xs:basic-0 md:basis-1/4  lg:basis-1/6 ">
        <BookGallery bookImg={book?.copy?.imageLink} />
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-3xl text-primary">
          {book?.book?.title}{" "}
        </h1>
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <Rating
              name="half-rating-read"
              defaultValue={0}
              value={countAvarageReview(book?.review)}
              precision={0.5}
              readOnly
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <p className="font-semibold ml-2">
              {countAvarageReview(book?.review)}
            </p>
          </div>
          <div className="flex">
            <div className="flex items-center">
              <TfiComments className="text-secondary" />
              <p className="text-sm text-primary ml-2">
                {book?.review?.length} lượt đánh giá
              </p>
            </div>
            <div className="flex text-xl text-primary gap-3 items-center ml-5">
              <IconButton color="primary" aria-label="add an alarm">
                <FaFacebook />
              </IconButton>
              <IconButton color="primary" aria-label="add an alarm">
                <FaRegShareSquare />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-2">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">Tác giả</p>
              <p className="text-md text-primary font-semibold">
                {arrayToString(book?.book?.authors)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">Nhà xuất bản</p>
              <p className="text-md text-primary font-semibold">
                {book?.book?.publisher}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">Ngày xuất bản</p>
              <p className="text-md text-primary font-semibold">
                {dayjs(book?.book?.publishedDate).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            {renderCategory()}

            <Button
              variant="outlined"
              color="success"
              startIcon={<LuShieldCheck />}
              sx={{ textTransform: "none" }}
            >
              Sách bán chạy của năm
            </Button>
          </div>
        </div>
        <div className="text-md border-l-2 pl-8 my-5">{book?.description}</div>
        {book?.allowRent == 1 && (
          <h1 className="text-2xl font-bold mb-3">
            Giá thuê: {formatCurrency(book?.leaseRate)}/ngày
          </h1>
        )}
        {book?.allowPurchase == 1 && (
          <h1 className="text-2xl font-bold mb-3">
            Giá mua: {formatCurrency(book?.price)}
          </h1>
        )}

        <div className="flex items-center gap-4">
          {book?.quantity == 0 ? (
            "Tạm thời hết sách"
          ) : (
            <p>Hiện vẫn còn hàng</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
