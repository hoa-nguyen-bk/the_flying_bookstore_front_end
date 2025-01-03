import dayjs from "dayjs";
import { IBuyOrderConvert, IOrderStatus, IRentOrder } from "../../types/order";
import { formatCurrency } from "../../utils/helps";
import { IOrderStatusBuyMessage, IOrderStatusMessage } from "../checkout/PaymentStatus";


export let callContentAlertBuy: (order: IBuyOrderConvert) => IOrderStatusBuyMessage | null = (order) => {

  if (!order?.status) return null;
  return {
    isSeller: {
      ORDERED_PAYMENT_PENDING: `Người mua mới đặt hàng, chờ người mua thanh toán`,
      PAYMENT_SUCCESS: "Người mua đã thanh toán thành công, người bán cần chuẩn bị sách để người mua lấy sách",
      DELIVERED: "Đã giao sách cho người mua, chờ admin trả người bán tiền bán sách",
      CANCELED: "Bạn đã hủy",
      PAID_BUYER: "Đơn hàng đã hoàn thành, Admin đã trả tiền cho người bán",
      PAID_SELLER: "Đơn hàng đã hoàn thành, Admin đã trả tiền cho người bán"
    },
    isBuyer: {
      ORDERED_PAYMENT_PENDING:
        order?.paymentMethod == "COD"
          ? "Vui lòng thanh toán đơn hàng trong 24 giờ"
          : "Vui lòng thanh toán đơn hàng trong 24 giờ, nếu chuyển khoản thành công, bạn hãy nhấn nút Đã trả tiền",
      PAYMENT_SUCCESS:
        "Vui lòng chỉ nhấn “đã nhận được sách” khi đơn hàng đã được giao đến bạn và bạn đã kiểm tra xong hàng",
      CANCELED: "Khách đã hủy",
      DELIVERED: "Đã giao sách cho người mua, chờ admin trả người bán tiền bán sách",
      PAID_BUYER: "Đơn hàng đã hoàn thành, Admin đã trả tiền cho người bán", 
      PAID_SELLER: "Đơn hàng đã hoàn thành, Admin đã trả tiền cho người bán"
    },
  };
};


export let callContentAlert: (order: IRentOrder) => IOrderStatusMessage | null = (order: IRentOrder) => {
  const dateEnd = dayjs(order?.leaseOrder?.toDate);

  const duration = dateEnd.diff(order?.leaseOrder?.fromDate, "day");

  if (!order?.leaseOrder?.status) return null;
  return {
    isCustomer: {
      ORDERED_PAYMENT_PENDING: `Người thuê mới đặt hàng, chờ người thuê thanh toán`,
      USER_PAID: "Người thuê đã thanh toán, chờ admin xác nhận đã nhận tiền thành công",
      PAYMENT_SUCCESS: "Người thuê đã thanh toán thành công, chủ sách cần chuẩn bị sách để người thuê lấy sách",
      DELIVERED: "Đã giao sách cho người thuê",
      RETURNING: "Bạn đã được nhận lại sách chưa?",
      RETURNED: "Bạn chờ admin trả lại tiền thuê trong 3-5 ngày làm việc nhé",
      LATE_RETURN: "Người thuê đang quá hạn trả sách, người thuê sẽ bị tính thêm tiền phạt trả sách"
    },
    isManager: {
      ORDERED_PAYMENT_PENDING:
        order?.leaseOrder?.paymentMethod == "COD"
          ? "Vui lòng thanh toán đơn hàng trong 24 giờ"
          : "Vui lòng thanh toán đơn hàng trong 24 giờ, nếu chuyển khoản thành công, bạn hãy nhấn nút Đã trả tiền",
      USER_PAID: "Vui lòng chờ admin xác nhận đã nhận tiền của bạn thành công",
      PAYMENT_SUCCESS:
        "Vui lòng chỉ nhấn “đã nhận được sách” khi đơn hàng đã được giao đến bạn và bạn đã nhận được hàng",
      DELIVERED: dayjs().isSame(order?.leaseOrder?.toDate, "day")
        ? "Bạn đã đến hạn trả sách"
        : `Bạn còn ${duration} ngày nữa, bạn có muốn trả sách sớm?`,
      RETURNED: "Bạn chờ admin trả lại tiền cọc trong 3-5 ngày làm việc nhé",
      LATE_RETURN: "Bạn hiện đã quá ngày trả sách, bạn vui lòng trả sách sớm. Với mỗi ngày trả trễ bạn sẽ bị tính thêm tiền phạt là " + formatCurrency(order.leaseOrder.totalPenaltyRate)
    },
  };
};
