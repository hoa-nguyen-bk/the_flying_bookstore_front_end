"use client";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/user";
import { IOrder, OrderType } from "../../types/order";
import DetailOrder from "./DetailOrder";
import { RxReload } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Loading from "../../app/loading";

export default function ListOrder({
  orderType,
  listOrder,
  reloadButton,
  reloadStatus,
  loading,

}: {
  orderType: OrderType;
  listOrder: Array<IOrder> | undefined;
  reloadButton:()=> Promise<void>;
  reloadStatus: (_: any, newValue: number) => Promise<void>;
  loading: boolean;
}) {
  const router = useRouter();
  const { profile } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // This ensures code runs only on the client side
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering the component on the server side
  }
  if (!profile?.id) {
    router.push("/login");
    return <>Mời bạn đăng nhập</>;
  }
  if (loading) {
    return <Loading />;
  }
  if (!listOrder || !Array.isArray(listOrder) || listOrder?.length == 0)
    return (
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Bạn hiện không có đơn hàng nào</Typography>
          <Button
            startIcon={<RxReload />}
            variant="outlined"
            onClick={reloadButton}
          >
            Tải lại
          </Button>
        </Grid>
      </Grid>
    );
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>Bạn hiện có {listOrder?.length} đơn hàng</Typography>
        <Button
          startIcon={<RxReload />}
          variant="outlined"
          onClick={reloadButton}
        >
          Tải lại
        </Button>
      </Grid>
      {listOrder.map((order, index) => (
        <Grid item xs={12} key={index}>
          <DetailOrder
            order={order}
            changeStatus={reloadStatus}
            orderType={orderType}
          />
        </Grid>
      ))}
    </Grid>
  );
}
