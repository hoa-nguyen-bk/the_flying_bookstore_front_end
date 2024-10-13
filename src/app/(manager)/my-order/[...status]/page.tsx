"use client";

import ListOrderMain from "../../../../components/customerOrder/ListOrderMain";
import { OrderType } from "../../../../types/order";

const MyOrder = () => {
  
  return (
      <ListOrderMain orderType={OrderType.Leasee}/>
  );
};
export default MyOrder;
