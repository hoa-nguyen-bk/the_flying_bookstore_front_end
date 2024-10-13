import { IOrderStatus, IPaymentMethod, OrderType } from "../../types/order";
type IOrderStatusMessage = {
  isCustomer: {
    [key in IOrderStatus]?: string;
  };
  isManager: {
    [key in IOrderStatus]?: string;
  };
};

const content: IOrderStatusMessage = {
  isCustomer: {
    ORDERED_PAYMENT_PENDING: `Chờ khách thanh toán`,
    PAYMENT_SUCCESS: `Chờ khách lấy hàng`,
    DELIVERED: `Chủ sách đã đưa hàng`,
    CANCELED: `Khách đã hủy`,
    USER_PAID: `Chờ admin duyệt thanh toán`,
    RETURNING: `Chủ sách chờ nhận sách`,
    RETURNED: `Chủ sách đã lấy lại sách`,
    LATE_RETURN: `Khách trả trễ`,
    DEPOSIT_RETURNED: `Admin đã trả tiền cọc cho người thuê`,
    PAID_OWNER: `Đã trả tiền thuê`
  },
  isManager: {
    ORDERED_PAYMENT_PENDING: `Chờ thanh toán`,
    USER_PAID: `Chờ admin duyệt thanh toán`,
    PAYMENT_SUCCESS: `Lấy hàng`,
    CANCELED: `Đã hủy`,
    DELIVERED: `Đã lấy hàng`,
    RETURNING: `Chờ chủ sách nhận sách`,
    RETURNED: `Đã trả sách`,
    DEPOSIT_RETURNED: `Admin đã trả tiền cọc`,
    PAID_OWNER: `Admin đã trả tiền đầy đủ`,
    LATE_RETURN: `Trả trễ`,
  },
};

const renderStatus = (
  status?: IOrderStatus | undefined,
  orderType?: OrderType
) => {
  if (!status) return <></>;
  if (orderType == OrderType.Leasor && content.isCustomer[status]) {
    return content.isCustomer[status];
  }
  if (content.isManager[status]) return content.isManager[status];
  return <>Chưa định nghĩa</>;
};
const renderPayment = (method?: IPaymentMethod | undefined) => {
  if (!method) return <></>;
  switch (method) {
    case "BANK_TRANSFER":
      return <>Chuyển khoản</>;
    case "COD":
      return <>COD</>;
    case "VNPAY":
      return <>VnPay</>;
    default:
      return <>Lỗi tí</>;
  }
};
export { renderPayment, renderStatus };
