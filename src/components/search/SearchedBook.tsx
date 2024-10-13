import Image from "next/image";
import BookImage from "@/assets/images/book loading.gif";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import styles from "./SearchedBook.module.css"; // Import external CSS file
import { formatCurrency } from "@/utils/helps";
import { IListing } from "@/types/book";
const SearchedBook = ({ book }: { book: IListing }) => {
  return (
    <Link href={`/detail/${book.id}`}>
      <div className="rounded-xl ease-in-out duration-300 hover:shadow-lg hover:shadow-indigo-500/40 py-5 px-3 ">
        <Image
          src={book?.copy?.imageLink || BookImage}
          alt={`Cover of ${book?.book?.title}`}
          className={`border rounded-xl mx-auto `} // Use external CSS class
          width={128}
          height={230}
          unoptimized
        />
        <h3 className="font-semibold text-lg text-primary my-2 truncate">
          {book?.book?.title}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            {book?.copy?.allow_rent == 1 && (<p className="text-sm text-gray-500">Thuê: {`${formatCurrency(book?.leaseRate)}/ngày` || "Không hợp lệ "}</p>)}
            {book?.copy?.allow_purchase == 1 && (<p className="text-sm text-gray-500">Mua: {`${formatCurrency(book?.price)}` || "Không hợp lệ "}</p>)}
          </div>
          <CiShoppingCart className="text-2xl mx-3" />
        </div>
      </div>
    </Link>
  );
};

export default SearchedBook;
