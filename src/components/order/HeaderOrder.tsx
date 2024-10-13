import { Button, Grid, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { CiLocationArrow1 } from "react-icons/ci";
import { IOrder, OrderType } from "../../types/order";
import dayjs from "dayjs";
import { renderStatus } from "../checkout/PaymentStatus";
import { useStoreStep } from "../../hooks/step";
const renderUserName = (order: IOrder, orderType: OrderType): string => {
  switch (orderType) {
    case OrderType.Leasee:
      return `${order?.lessor?.lastName} ${order?.lessor?.firstName}`; // Nếu là khách hàng
    case OrderType.Leasor:
      return `${order?.lessee?.lastName} ${order?.lessee?.firstName}`; // Nếu là khách hàng
    default:
      return "Không có tên"; // Trả về giá trị mặc định nếu không có tên
  }
};
const orderUserTitles: Record<OrderType, string> = {
  [OrderType.Buy]: "Người mua",
  [OrderType.Sell]: "Người bán",
  [OrderType.Leasee]: "Người thuê",
  [OrderType.Leasor]: "Chủ sách",
};
const orderStakeholderTitles: Record<OrderType, string> = {
  [OrderType.Buy]: orderUserTitles[OrderType.Sell],
  [OrderType.Sell]: orderUserTitles[OrderType.Buy],
  [OrderType.Leasee]: orderUserTitles[OrderType.Leasor],
  [OrderType.Leasor]: orderUserTitles[OrderType.Leasee],
};
export const HeaderOrder = ({
  order,
  orderType,
}: {
  order: IOrder;
  orderType: OrderType;
}) => {

  const theme = useTheme();
  const { tabNum } = useStoreStep()


  return (
    <Grid
      container
      mt={0.1}
      mb={1}
      spacing={2}
      justifyItems="center"
      alignItems="center"
    >
      <Grid item xs={2}>
        <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
          Id đơn hàng
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          #{order?.leaseOrder?.id}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
          {orderStakeholderTitles[orderType] || orderStakeholderTitles[OrderType.Leasor]}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          {renderUserName(order, orderType)}
        </Typography>
      </Grid>
      {tabNum == 0 && (
        <Grid item xs={2}>
          <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
            Thời gian thuê
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            {dayjs(order?.leaseOrder?.fromDate).format("DD/MM")} - {` `}
            {dayjs(order?.leaseOrder?.toDate).format("DD/MM/YYYY")}
          </Typography>
        </Grid>
      )}
      <Grid item xs={3}>
        <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
          Trạng thái {orderUserTitles[orderType] || orderUserTitles[OrderType.Leasor]}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          {renderStatus(order?.leaseOrder?.status, orderType)}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Link href={`/order/${order?.leaseOrder?.id}`}>
          <Button
            endIcon={<CiLocationArrow1 />}
            sx={{ textTransform: "none" }}
            variant="text"
          >
            Xem chi tiết
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
