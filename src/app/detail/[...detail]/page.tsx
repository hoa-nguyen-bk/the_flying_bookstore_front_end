"use client";
import BookInfo from "@/components/detail/BookInfo";
import DocumentInfo from "@/components/detail/DocumentInfo";
import RentBook from "@/components/detail/RentBook";
import PromoteSection from "@/components/home/PromoteSection";
import { IListing } from "@/types/book";
import { useEffect, useState } from "react";
import { getBookDetailService } from "@/api/bookListService";
import { IParamsDetail } from "@/types/params";
import { useStoreAlert } from "../../../hooks/alert";

export default function Page({ params }: IParamsDetail) {
  const [listing, setListing] = useState<IListing>();
  const { callErrorAlert } = useStoreAlert(state => state);
  useEffect(() => {
    const makeRequest = async () => {
      const response = await getBookDetailService(params.detail[0]);
      if (typeof response !== 'string') {
        setListing(response);
      } else {
        callErrorAlert(response);
      }
    }
    makeRequest();
  }, [callErrorAlert, params.detail]);

  return (
    <div className="container mx-auto mt-10 mb-20">
      <BookInfo book={listing} />
      <div className="flex mt-5 gap-5">
        <div className="basis-9/12">
          <DocumentInfo book={listing} />
        </div>
        <div className="flex-1">
          <RentBook book={listing} />
        </div>
      </div>
      <PromoteSection />
    </div>
  );
}
