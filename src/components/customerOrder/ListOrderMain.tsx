"use client";
import ListOrder from "@/components/order/ListOrder";
import {
  Box,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import CustomTabPanel, { orderProps } from "../order/CustomTabPanel";
import { IOrder, OrderType } from "../../types/order";
import { useAuthStore } from "../../hooks/user";
import { useStoreAlert } from "../../hooks/alert";
import { useRouter } from "next/navigation";
import { getAllOrder, getOrderWithStatusService } from "../../api/order";
import useApiCall from "../../hooks/useApiCall";
import { useStoreStep } from "../../hooks/step";

const arrSame: Array<{ label: string }> = [
  { label: "Tất cả" },
  { label: "Đã đặt hàng" },
  { label: "Đã nhận" },
]

const arrStatusBuySell: Array<{ label: string }> = [
  ...arrSame,
  { label: "Đã hủy" },
];

const arrStatus: Array<{ label: string }> = [
  ...arrSame,
  { label: "Đã quá hạn" },
  { label: "Đã trả sách" },
  { label: "Đã hủy" },
];
const ListOrderMain = ({ orderType }: { orderType: OrderType }) => {
  const [status, setStatus] = useState(0);
  const { profile } = useAuthStore();
  const { tabNum } = useStoreStep()
  const { callAlert, callErrorAlert } = useStoreAlert();
  const [listOrder, setListOrder] = useState<Array<IOrder>>();
  const { handleApiCall, loading } = useApiCall<IOrder[]>();  // Sử dụng hook
  const router = useRouter();

  const handleChange = (_: any, newValue: number) => {
    setStatus(newValue);
  }
  const callApiGetAllOrder = useCallback(async () => {
    const isCustomer = orderType === OrderType.Leasee;
    if (!profile?.id) {
      callAlert("Mời bạn đăng nhập lại!");
      return router.push("/");
    }
    return await handleApiCall(
      () => getAllOrder(profile?.id, isCustomer),
      (response) => {
        setListOrder(response)
      },
      "Lấy đơn hàng thành công"
    )
  }, [orderType, profile?.id, handleApiCall, callAlert, router]);

  const getOrderWithStatus = useCallback(async (status: number) => {
    const isCustomer = orderType === OrderType.Leasee;
    // Sử dụng handleApiCall từ hook
    return await handleApiCall(
      // Hàm gọi API
      () => getOrderWithStatusService(status, profile, isCustomer),

      // Hàm xử lý khi API thành công
      (response) => {
        setListOrder(response);  // Cập nhật state listOrder
      },
      "Lấy đơn hàng thành công"
    );
  }, [handleApiCall, orderType, profile]);
  const callWhichApi = useCallback(async () => {
    switch (status) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return await getOrderWithStatus(status);
      case 0:
        return await callApiGetAllOrder();
      default:
        return callAlert("Cần thêm status mới");
    }
  }, [status, getOrderWithStatus, callApiGetAllOrder, callAlert]);
  const reloadButton = async () => {
    return await callWhichApi().then(() => {
      callAlert("Đã tải lại thành công");
    });
  };
  const reloadStatus = async (_: any, newValue: number) => {
    setStatus(newValue);
    return await callWhichApi();
  };
  useEffect(() => {
    callWhichApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const renderSectionTab = () => {
    return (tabNum == 1 ? arrStatusBuySell : arrStatus).map((_, index) => {
      return (
        <CustomTabPanel value={status} index={index} key={index}>
          <ListOrder orderType={orderType} listOrder={listOrder} loading={loading} reloadButton={reloadButton} reloadStatus={reloadStatus} />
        </CustomTabPanel>
      );
    });
  };
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Quản lý đơn {orderType}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={status} onChange={handleChange} aria-label="order tab">
          {(tabNum == 1 ? arrStatusBuySell : arrStatus).map(({ label }, index) => {
            return <Tab label={label} {...orderProps(index)} key={index} />;
          })}
        </Tabs>
      </Box>
      {renderSectionTab()}
    </>
  );
};
export default ListOrderMain;
