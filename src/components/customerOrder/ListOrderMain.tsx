"use client";
import ListOrder from "@/components/order/ListOrder";
import {
  Box,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomTabPanel, { orderProps } from "../order/CustomTabPanel";


const arrStatus: Array<{label: string,index:number}> = [
  { label: "Tất cả", index: 0 },
  { label: "Đã đặt hàng", index: 1 },
  { label: "Đã nhận", index: 2 },
  { label: "Đã quá hạn", index: 3 },
  { label: "Đã trả sách", index: 4 },
  { label: "Đã hủy", index: 5 },
];
const ListOrderMain = ({isCustomer = false}:{isCustomer?:boolean}) => {
  const [value, setValue] = useState(0);
  const handleChange = (_:any, newValue: number) => {
    setValue(newValue);
  }
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Quản lý đơn hàng của {isCustomer?`khách`: `tôi`}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="order tab">
          {arrStatus.map(({ label, index }) => {
            return <Tab label={label} {...orderProps(index)} key={index} />;
          })}
        </Tabs>
      </Box>
      {arrStatus.map(({ index }) => {
        return (
          <CustomTabPanel value={value} index={index} key={index}>
            <ListOrder status={index} changeStatus={handleChange} isCustomer={isCustomer}/>
          </CustomTabPanel>
        );
      })}
    </>
  );
};
export default ListOrderMain;
