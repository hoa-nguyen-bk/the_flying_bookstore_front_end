import Image from 'next/image'
import React from 'react'
import BookImg from "./../../assets/images/loading-meo.gif";
import { IListing } from '../../types/book';
import Link from 'next/link';

const BookDetailInfo = ({book}:{book?: IListing,}) => {
  return (
    <><div className="basis-2/12 relative w-32 h-48">
      <Image fill src={book?.copy.imageLink || BookImg} alt="d" className="object-contain rounded-lg" unoptimized />
    </div>
      <div className="basis-4/12 flex flex-col justify-center">
        <Link href={`/detail/${book?.id}`}>
        <h4 className="text-primary font-semibold text-lg">
          {book?.book.title}
        </h4>
        </Link>
        <p className="text-sm text-gray-500 ">{book?.book.authors}</p>
      </div>
      <div className="basis-2/12 flex items-center ">
        <p className="text-sm mr-3">Số lượng:</p>
        <p className="text-sm text-gray-400">1</p>
      </div></>
  )
}

export default BookDetailInfo