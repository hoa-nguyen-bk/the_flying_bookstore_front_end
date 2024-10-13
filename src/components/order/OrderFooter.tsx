"use client";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RateModel from "./RateModel";
import { useState } from "react";
import { formatCurrency } from "../../utils/helps";
import { IOrder, IOrderStatus, OrderType } from "../../types/order";
import { updateStatusOrder } from "../../api/order";
import { useStoreAlert } from "../../hooks/alert";
import { CiTrash } from "react-icons/ci";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import CancelModal from "./CancelModal";
import { callContentAlert } from "./contentAlert";
import { useAuthStore } from "../../hooks/user";
dayjs.extend(localizedFormat);
//tiếng việt
require("dayjs/locale/vi");
dayjs.locale("vi"); // use locale globally
dayjs.extend(relativeTime);

export type IRateModal = { open: boolean; order: IOrder };
const OrderFooter = ({
  order,
  changeStatus,
  orderType,
}: {
  orderType?: OrderType;
  order: IOrder;
  changeStatus: (e: any, newValue: number) => void;
}) => {
  const [rateModal, setRateModal] = useState<IRateModal>({
    open: false,
    order,
  });
  const [cancelModal, setCancelModal] = useState({
    open: false,
    order,
  });
  const { token } = useAuthStore()
  const { callAlert } = useStoreAlert();
  const handleClickOpenRateModal = () => {
    setRateModal((state) => ({ ...state, open: true }));
  };
  const renderAlert = () => {
    if (!order?.leaseOrder?.status) return <></>;
    const content = callContentAlert(order);
    if (orderType == OrderType.Leasor) {
      if (
        !content?.isCustomer[order?.leaseOrder?.status] ||
        content?.isCustomer[order?.leaseOrder?.status] == ""
      ) {
        return <></>;
      }
      return (
        <Alert variant="standard" color="info">
          {content?.isCustomer[order?.leaseOrder?.status]}
        </Alert>
      );
    } else {
      if (
        !content?.isManager[order?.leaseOrder?.status] ||
        content?.isManager[order?.leaseOrder?.status] == ""
      ) {
        return <></>;
      }
      return (
        <Alert variant="standard" color="info">
          {content?.isManager[order?.leaseOrder?.status]}
        </Alert>
      );
    }
  };

  const callUpdateStatus = async (
    statusMessage: IOrderStatus,
    status: number,
    alertMessage: string
  ): Promise<void> => {
    if (!order?.leaseOrder?.id || !token) return;
    return await updateStatusOrder(statusMessage, order?.leaseOrder?.id, token).then(
      () => {
        callAlert(`${alertMessage} thành công`);
        changeStatus(null, status);
      }
    );
  };
  const cancelButton = (
    <IconButton
      color="error"
      aria-label="delete"
      onClick={() => setCancelModal((state) => ({ ...state, open: true }))}
    >
      <CiTrash />
    </IconButton>
  );
  const renderButton = () => {
    let message = "";
    if (orderType == OrderType.Leasor) {
      switch (order?.leaseOrder?.status) {
        case "RETURNING":
          message = `Đã nhận lại sách`;
          return (
            <Button
              variant="contained" sx={{textTransform:"capitalize"}}
              onClick={() => callUpdateStatus("RETURNED", 4, message)}
            >
              {message}
            </Button>
          );
        default:
          // return <></>;
      }
    }
    switch (order?.leaseOrder?.status) {
      case "PAYMENT_SUCCESS":
        message = `Đã nhận được hàng`;
        return (
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button
              variant="contained"
                      sx={{textTransform:"capitalize"}}
              onClick={() => callUpdateStatus("DELIVERED", 2, message)}
            >
              {message}
            </Button>
            <Button
              variant="outlined"
              sx={{textTransform:"capitalize"}}
              onClick={() => { }}
            >
              Mua sách
            </Button>
          </Stack>
        );
      case "ORDERED_PAYMENT_PENDING":
        if (order?.leaseOrder?.paymentMethod == "COD") return cancelButton;
        message = `Đã trả tiền`;
        return (
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Button
              variant="contained"
              sx={{textTransform:"capitalize"}}
              onClick={() => callUpdateStatus("USER_PAID", 1, message)}
            >
              {message}
            </Button>
            <Button
              variant="outlined"
              sx={{textTransform:"capitalize"}}
              onClick={() => { }}
            >
              Mua sách
            </Button>
            {cancelButton}
          </Stack>
        );
      case "DELIVERED":
        message = `Đã trả sách`;
        return (
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button
              variant="contained"
              sx={{textTransform:"capitalize"}}
              onClick={() => callUpdateStatus("RETURNING", 2, message)}
            >
              {message}
            </Button>
            <Button
              variant="outlined"
              sx={{textTransform:"capitalize"}}
              onClick={() => { }}
            >
              Mua sách
            </Button>
          </Stack>
        );
      case "RETURNED":
        return (
          <>
            <Button variant="contained" sx={{textTransform:"capitalize"}} onClick={handleClickOpenRateModal}>
              Đánh giá
            </Button>
          </>
        );

      case "LATE_RETURN":
        message = `Đã trả sách`;
        return (
          <>
            <Button
              variant="contained" sx={{textTransform:"capitalize"}}
              onClick={() => callUpdateStatus("RETURNING", 2, message)}
            >
              {message}
            </Button>
          </>
        );
      default:
        break;
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        mt={1}
        justifyItems="center"
        alignItems="center"
      >
        <Grid item xs={6} mb={1}>
          {renderAlert()}
        </Grid>
        <Grid item xs={3} mb={1}>
          {renderButton()}
        </Grid>

        <Grid item xs={3} sx={{ textAlign: "right" }}>
          <Typography variant="body2" color={"gray"}>
            Tổng tiền thuê: {formatCurrency(order?.leaseOrder?.totalLeaseFee)}
          </Typography>
          <Typography variant="body2" color={"gray"}>
            Tổng tiền cọc: {formatCurrency(order?.leaseOrder?.totalDeposit)}
          </Typography>
          <Typography variant="body1">
            Tổng tiền: {formatCurrency(order?.leaseOrder?.totalDeposit)}
          </Typography>
        </Grid>
      </Grid>
      <RateModel rateModal={rateModal} setRateModal={setRateModal} />
      <CancelModal
        cancelModal={cancelModal}
        setCancelModal={setCancelModal}
        callUpdateStatus={callUpdateStatus}
      />
    </>
  );
};

export default OrderFooter;
