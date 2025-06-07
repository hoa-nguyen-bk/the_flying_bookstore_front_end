import axios from "axios";
import { headerAxios, port_other } from "../utils/env";
import { handleError } from "./handleError";
import { IOrderEmail } from "@/types/order";


export const sendReceiptEmail = async (payload: any) => {
  return await axios
    .post(`${port_other}/api/emails/send-receipt`, payload, {
      headers: {
        ...headerAxios
      }
    })
    .then((res) => res)
    .catch((error) => {
      console.error("Error sending receipt email:", error);
    });
};