"use client";
import { Typography } from "@mui/material";
import Order from "../../../../components/checkout/Order";
import { IOrder } from "../../../../types/order";
import { getDetailOrder } from "../../../../api/order";
import { useEffect, useState } from "react";
import useApiCall from "../../../../hooks/useApiCall";
import Loading from "../../../loading";

const Page = ({ params }: { params: { order: string } }) => {
  const [orderDetail, setOrderDetail] = useState<IOrder | undefined>();
  const { handleApiCall, loading } = useApiCall();

  useEffect(() => {
    if (!params?.order) return;
    const fetchOrderDetail = async () => {
      await handleApiCall(
        () => getDetailOrder(parseInt(params?.order)),
        (response: any) => setOrderDetail(response?.data as IOrder),
        "Lấy đơn hàng thành công",
      );
    };
    fetchOrderDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full mx-auto border rounded-lg py-8 mt-20 px-10">
        <h3 className="text-center text-primary text-2xl font-semibold text-primary mb-6">
          Chi tiết đơn hàng #{params?.order}
        </h3>
        {loading ? <Loading /> : orderDetail ? (
          <Order orderDetail={orderDetail} />
        ) : (
          <>Không có đơn hàng</>
        )}
      </div>
    </>
  );
};

export default Page;
