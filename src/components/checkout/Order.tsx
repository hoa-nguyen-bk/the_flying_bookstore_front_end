import { Divider } from "@mui/material";
import React, { } from "react";
import BookItem from "./BookItem";
import { BsFileText } from "react-icons/bs";
import { PiCalendarCheck } from "react-icons/pi";
import { LuFlag } from "react-icons/lu";
import { CgCreditCard } from "react-icons/cg";
import { IOrder } from "../../types/order";
import dayjs from "dayjs";
import { renderPayment, renderStatus } from "./PaymentStatus";
import { useStoreStep } from "../../hooks/step";
import { GrUserManager } from "react-icons/gr";
import { RiCalendarTodoLine } from "react-icons/ri";
import { RiMapPin2Line } from "react-icons/ri";
import { PiPhone } from "react-icons/pi";
import { formatCurrency, formatPhoneNumber } from "../../utils/helps";
import CartInfoItem, { CartInfoItemProps } from "../cart/CartInfoItem";
import { PiMoney } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { TbSum } from "react-icons/tb";

const Order = ({ orderDetail }: { orderDetail: IOrder }) => {
  const { leaseOrder = null, lessor = null } = orderDetail
  const { tabNum } = useStoreStep();

  if (!leaseOrder) return <>Không có đơn hàng</>
  const renderDurationRent = () => {
    const firstDayEnd = orderDetail?.leaseOrder?.toDate;
    const dateStart = orderDetail?.leaseOrder?.fromDate;
    const dateEnd = dayjs(firstDayEnd).add(1, "day");
    if (!dateStart || !dateEnd) return 0;
    const duration = dateEnd.diff(dateStart, "day");
    return duration;
  };
  const listOrderDetail: Array<CartInfoItemProps> = [
    {
      title: `Mã đơn hàng`,
      description: leaseOrder.id,
      children: <BsFileText className="total__icon" />
    },
    {
      title: `Ngày đặt ${tabNum == 0 ? "thuê" : "mua"}`,
      description: dayjs(leaseOrder.createdDate).format("DD/MM/YYYY"),
      children: <PiCalendarCheck className="total__icon" />
    },
    {
      title: `Người ${tabNum == 0 ? " cho thuê" : "bán"}`,
      description: `${lessor?.lastName} ${lessor?.firstName}`,
      children: <GrUserManager className="total__icon" />
    },
    ...(tabNum == 0 ? [{
      title: `Thời gian thuê`,
      description: ` ${dayjs(leaseOrder?.fromDate).format("DD/MM/YYYY")} - ${dayjs(leaseOrder?.toDate).format("DD/MM/YYYY")}`,
      children: <RiCalendarTodoLine className="total__icon" />
    }, {
      title: `Địa chỉ người  cho thuê `,
      description: leaseOrder?.lessorAddress,
      children: <RiMapPin2Line className="total__icon" />
    }, {
      title: `Số điện thoại người cho thuê`,
      description: formatPhoneNumber(lessor?.phoneNumber),
      children: <PiPhone className="total__icon" />
    },] : [{
      title: `Địa chỉ người bán`,
      description: leaseOrder?.lessorAddress,
      children: <RiMapPin2Line className="total__icon" />
    }, {
      title: `Số điện thoại người bán`,
      description: formatPhoneNumber(lessor?.phoneNumber),
      children: <PiPhone className="total__icon" />
    },])
    ,

    {
      title: `Số điện thoại người ${tabNum == 0 ? " cho thuê" : "bán"}`,
      description: formatPhoneNumber(lessor?.phoneNumber),
      children: <PiPhone className="total__icon" />
    },
    {
      title: `Trạng thái`,
      description: renderStatus(leaseOrder.status),
      children: <LuFlag className="total__icon" />
    },
    {
      title: `Phương thức thanh toán`,
      description: renderPayment(leaseOrder.paymentMethod),
      children: <CgCreditCard className="total__icon" />
    },
    ...(tabNum == 0 ? [{
      title: `Số ngày thuê`,
      description: renderDurationRent(),
      children: <RiCalendarTodoLine className="total__icon" />
    }, {
      title: `Tiền thuê`,
      description: formatCurrency(orderDetail?.leaseOrder?.totalLeaseFee),
      children: <PiMoney className="total__icon" />
    }, {
      title: `Tiền cọc`,
      description: formatCurrency(orderDetail?.leaseOrder?.totalDeposit),
      children: <GiMoneyStack className="total__icon" />
    }] : [{
      title: `Giá bán`,
      description: formatCurrency(orderDetail?.leaseOrder?.totalDeposit),
      children: <PiMoney className="total__icon" />
    }]),
  ]
  return (
    <>
      <Divider>Bài đăng</Divider>
      <BookItem orderDetail={orderDetail} />
      <Divider sx={{ mt: 3 }} />
      <h4 className="text-lg font-medium text-center mt-5 my-3">
        Thông tin đặt hàng
      </h4>
      <div className="columns-2 gap-10 my-4">
        <div className="total">
          {listOrderDetail.map(({ title, children, description }, index) => (<CartInfoItem key={index * 2} title={title} description={description} >{children}</CartInfoItem>))}
          <div className="border-t">
            <CartInfoItem title={`Tổng cộng`} description={!!orderDetail?.leaseOrder?.totalDeposit && formatCurrency(orderDetail?.leaseOrder?.totalDeposit)} ><TbSum className="total__icon" /></CartInfoItem>
          </div>
        </div>
      </div >
    </>
  );
};

export default Order;
