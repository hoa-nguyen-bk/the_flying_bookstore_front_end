import { Box } from "@mui/material";
import { HeaderOrder } from "./HeaderOrder";
import { DataGrid } from "@mui/x-data-grid";
import { IRow, columnsOrderRent, columnsOrderSellBuy, convertToRow } from "./column";
import NoData from "./NoData";
import OrderFooter from "./OrderFooter";
import { IOrder, OrderType } from "../../types/order";
import { useState } from "react";
import theme from "../../utils/theme";
import { useStoreStep } from "../../hooks/step";

const DetailOrder = ({
  order,
  changeStatus,
  orderType,
}: {
  order: IOrder;
  orderType: OrderType;
  changeStatus: (e: any, newValue: number) => void;
}) => {
  const { tabNum } = useStoreStep()
  const [listBook, setlistBook] = useState<IRow[]>(
    order && order.listing ? [convertToRow(order)] : []
  );

  if (!order) return <>Hiện chưa có đơn hàng</>;
  return (
    <Box
      sx={{
        width: "100%",
        border: 1,
        borderRadius: 3,
        borderColor: theme.palette.grey[400],
        px: 2,
        py: 1,
        height: listBook.length != 0 ? "auto" : "500px",
      }}
    >
      <HeaderOrder order={order} orderType={orderType} />
      <DataGrid
        rows={listBook}
        columns={tabNum == 1 ? columnsOrderSellBuy : columnsOrderRent}
        disableRowSelectionOnClick
        slots={{ noRowsOverlay: NoData }}
        sx={{ border: "none" }}
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter

      />
      <OrderFooter changeStatus={changeStatus} order={order} orderType={orderType} />
    </Box>
  );
};

export default DetailOrder;
