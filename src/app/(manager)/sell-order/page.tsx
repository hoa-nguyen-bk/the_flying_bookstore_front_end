import { SITE_NAME } from "@/utils/env"
import { Metadata } from "next"
import ListOrderMain from "../../../components/customerOrder/ListOrderMain";
import { OrderType } from "../../../types/order";

export const metadata: Metadata={
  title: `Quản lý đơn ${OrderType.Sell} | ${SITE_NAME}`,
}

const page = () => {
  return <ListOrderMain orderType={OrderType.Sell} />;
};
export default page;