import { Alert, Button } from "@mui/material";
import "./../cart/Cart.scss";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Order from "./Order";
import { useStoreOrder } from "../../hooks/order";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IOrderStatus, IRentOrder } from "../../types/order";
import { renderPayment } from "./PaymentStatus";
import { useUrl } from "nextjs-current-url";
import { parseUrlParams } from "./parseUrlParams";
import { IParamsVNpay } from "../../types/checkout";
import { getDetailRentOrder, updateStatusOrder } from "../../api/order";
import { useAuthStore } from "../../hooks/user";
import { useStoreAlert } from "../../hooks/alert";
import { useStoreStep } from "../../hooks/step";
import dayjs from "dayjs";
import { sendReceiptEmail } from "@/api/email";

const Step2 = ({
  handleNext,
}: {
  handleNext: () => void;
}) => {
  const { rentOrderId } = useStoreOrder();
  const [orderDetail, setOrderDetail] = useState<IRentOrder>();
  const { href: currentUrl } = useUrl() ?? {};
  const { token, profile } = useAuthStore()
  const { tabNum } = useStoreStep();
  const { callAlert, callErrorAlert } = useStoreAlert(state => state);
  const getOrder = async () => {
    if (!rentOrderId || !token) return;
    return await updateStatusOrder(
      "DELIVERED",
      rentOrderId,
      token
    ).then(() => {
      callAlert("Cập nhập đơn hàng thành công")
      handleNext();
    });
  };
  useEffect(() => {
    const getStatusOrder = async () => {
      if (!currentUrl || !token) return;
      const params: IParamsVNpay = parseUrlParams(currentUrl);
      if (params.vnp_TransactionStatus == "00" && rentOrderId) {
        // gọi api thay đổi trạng thái đơn hàng ở đây
        return await updateStatusOrder("PAYMENT_SUCCESS", rentOrderId, token).then(async () => {
          callAlert("Thanh toán thành công");
          return await getDetailRentOrder(rentOrderId).then((response) => {
            if (typeof response != "string") {
              setOrderDetail(response.data);
            } else {
              callErrorAlert(response)
            }
          });
        });
      }
    };
    getStatusOrder();
  }, [callAlert, callErrorAlert, currentUrl, rentOrderId, token]);

  useEffect(() => {
    const getOrderApi = async () => {
      if (!rentOrderId) return;
      try {
        const response = await getDetailRentOrder(rentOrderId);
        if (typeof response != "string") {
          setOrderDetail(response?.data);
        } else {
          callErrorAlert(response)
        }
      } catch (error) { }
    };
    getOrderApi();
  }, [callErrorAlert, rentOrderId]);

  const renderAlert = (status?: IOrderStatus | undefined) => {
    if (!status) return <></>;
    let contentAlert = <></>;
    switch (status) {
      case "PAYMENT_SUCCESS":
        contentAlert = (
          <>
            Mời bạn đến địa chỉ cho thuê để lấy tài liệu, sau đó bạn hãy bấm nút
            &apos;Xác nhận lấy hàng&apos; dưới đây
          </>
        );
        break;
      case "ORDERED_PAYMENT_PENDING":
        contentAlert = (
          <>
            Bạn hãy nhanh chóng thanh toán theo phương thức{" "}
            {renderPayment(orderDetail?.leaseOrder?.paymentMethod)} để lấy hàng
          </>
        );
        break;
      default:
        contentAlert = <>Chưa định nghĩa</>;
        break;
    }
    return (
      <div className="mt-10 w-2/3 mx-auto">
        <Alert severity="info">{contentAlert}</Alert>
      </div>
    );
  };

  return (
    <>
      <div className="w-2/3 mx-auto border rounded-lg py-8 mt-20 px-10">
        <h3 className="mb-5 text-center text-primary text-2xl font-semibold text-primary">
          Đơn hàng được tạo thành công!
        </h3>
        {orderDetail ? (
          <Order orderDetail={orderDetail} />
        ) : (
          <>Không có đơn hàng</>
        )}
      </div>
      {renderAlert(orderDetail?.leaseOrder?.status ?? undefined)}

      <div className=" mt-10 mb-20 w-2/3 mx-auto flex justify-between">
        <Link href="/">
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "white", textTransform: "none" }}
            size="large"
            startIcon={<CiShoppingCart />}
          >
            Tiếp tục mua sắm
          </Button>
        </Link>
        <Link href={tabNum == 1 ? "/buy-order" : "/my-order/0"}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            size="large"
          >
            Quản lý đơn hàng
          </Button>
        </Link>

        <Button
          variant="contained"
          sx={{ textTransform: "none", color: "white" }}
          size="large"
          disabled={orderDetail?.leaseOrder?.status !== "PAYMENT_SUCCESS"}
          startIcon={<IoCheckmarkCircleOutline />}
          onClick={getOrder}
        >
          Xác nhận lấy hàng
        </Button>

        {orderDetail?.leaseOrder?.status === "PAYMENT_SUCCESS" && (
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            size="large"
            onClick={async () => {
              if (!orderDetail) return;

              const orderEmailPayload = {
                id: orderDetail?.leaseOrder?.id ?? 0,
                lessorName: `${orderDetail?.lessor?.lastName ?? ""} ${orderDetail?.lessor?.firstName ?? ""}`,
                phoneNumber: orderDetail?.lessor?.phoneNumber ?? "",
                lessorAddress: orderDetail?.leaseOrder?.lessorAddress ?? "",
                createdDate: orderDetail?.leaseOrder?.createdDate ?? "",
                fromDate: orderDetail?.leaseOrder?.fromDate ?? "",
                toDate: orderDetail?.leaseOrder?.toDate ?? "",
                duration: (() => {
                  const firstDayEnd = orderDetail?.leaseOrder?.toDate;
                  const dateStart = orderDetail?.leaseOrder?.fromDate;
                  const dateEnd = dayjs(firstDayEnd).add(1, "day");
                  if (!dateStart || !dateEnd) return 0;
                  const duration = dateEnd.diff(dateStart, "day");
                  return duration > 0 ? duration : 0;
                })(),
                paymentMethod: orderDetail?.leaseOrder?.paymentMethod ?? "",
                totalLeaseFee: orderDetail?.leaseOrder?.totalLeaseFee ?? 0,
                totalDeposit: orderDetail?.leaseOrder?.totalDeposit ?? 0,
                buyerEmail: profile?.email ?? ""
              };
              console.log(orderEmailPayload);

              try {
                await sendReceiptEmail(orderEmailPayload);
                console.log(orderEmailPayload);
                callAlert("Đã gửi biên lai điện tử qua email thành công!");
              } catch (error) {
                callErrorAlert("Gửi email thất bại!");
              }
            }}
          >
            Gửi biên lai qua email
          </Button>
        )}
      </div>
    </>
  );
};

export default Step2;
