import axios from "axios";
import {  IChangeToBuyOrder, IOrderStatus, IOrderStatusBuy } from "../types/order";
import { useAuthStore } from "@/hooks/user";
import { IUser } from "../types/user";
import { headerAxios, port, port_other } from "../utils/env";
import { handleError } from "./handleError";

export const getDetailBuyOrder = async (orderId: number) => {
  return await axios
    .request({ url: `${port}/api/SaleOrder/` + orderId , headers:headerAxios}, )
    .then((res) => res)
    .catch((error) => {
      return handleError(error);
    });
};
export const getDetailRentOrder = async (orderId: number) => {
  return await axios
    .request({ url: `${port}/api/leaseOrder/` + orderId, headers: headerAxios })
    .then((res) => res)
    .catch((error) => {
      return handleError(error);
    });
};

export const getAllOrder = async (userId: number, isCustomer?: boolean) => {
  return await axios
    .request({
      url: `${port}/api/leaseOrder/search/${isCustomer ? `lessee` : `lessor`
        }/${userId}`,headers: headerAxios
    })
    .then((response) => {
      const resultListOrder = response.data;
      if (resultListOrder) {
        return resultListOrder;
      }
    })
    .catch((error) => {
      handleError(error)
    });
};

export const updateStatusOrder = async (status: IOrderStatus, id: number, token: string) => {
  return await axios
    .request({
      url: `${port}/api/leaseOrder/edit/status`,
      params: { id, status },
      headers: {
        ...headerAxios,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => { })
    .catch((error) => {
      handleError(error)
    });
};
export const updateStatusSaleOrder = async (status: IOrderStatusBuy, id: number, token: string) => {
  return await axios
    .request({
      url: `${port}/api/SaleOrder/status`,
      params: { id, status },
      headers: {
        ...headerAxios,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => { })
    .catch((error) => {
      handleError(error)
    });
};
export const changeToBuyOrder = async ( token: string, data: IChangeToBuyOrder) => {
  return await axios
    .request({
      url: `${port}/api/SaleOrder/createSaleOrderFromLease`,
      headers: {
        ...headerAxios,
        Authorization: `Bearer ${token}`,
      },
      method:"POST",
      data
    })
    .then((response) => {
      
     })
    .catch((error) => {
      handleError(error)
    });
};

export const getOrderWithStatusService = async (status: number, profile: IUser | null, isCustomer?: boolean) => {
  try {
    const response = await axios.request({
      url: `${port}/api/leaseOrder/search/${isCustomer ? `lessee` : `lessor`
        }/status/${profile?.id}`,
      params: {
        status,
      },
      headers:headerAxios

    });
    return response.data;
  }
  catch (error) {
    handleError(error)
  };
};


export const createVNPayPayment = async (amount: number) => {
  try {
    const response = await axios.request({
      url: `${port_other}/api/payment/submitOrder`,
      method: "POST",
      params: { amount },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headerAxios,
      },
    });

    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
};


export const checkVNPayPayment = async (params: { [key: string]: string }) => {
  try {
    const response = await axios.request({
      url: `${port_other}/api/payment/vnpay-payment`,
      method: "GET",
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headerAxios,
      },
    });

    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
};