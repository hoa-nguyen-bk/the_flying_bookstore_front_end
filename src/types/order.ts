import { IRowBuy } from "../components/order/column";
import { IBook, IListing, IReview } from "./book";
import { IFormVoucher } from "./form";
import { IUser } from "./user";
import { IVoucherSession } from "./voucher";
export enum OrderType {
  Buy = "mua",
  Sell = "bán",
  Leasor = "cho thuê",
  Leasee = "thuê",
}

interface ILeaseOrderDetail {
  id: number;
  listingId: number;
  leaseRate: number;
  depositFee: number;
  penaltyRate: number;
  title: string;
}
export interface IChangeToBuyOrder {
  LeaseOrderId: string;
  listingId: number;
  buyerAddress: string;
  paymentMethod: IPaymentMethod;
}
export type IOrderStatusBuy =
  "ORDERED_PAYMENT_PENDING" |
  "CANCELED" |
  "PAYMENT_SUCCESS" |
  "DELIVERED" |
  "PAID_BUYER" |
  "PAID_SELLER";
export type IOrderStatus =
  | "ORDERED_PAYMENT_PENDING"
  | "CANCELED"
  | "PAYMENT_SUCCESS"
  | "DELIVERED"
  | "LATE_RETURN"
  | "RETURNING"
  | "RETURNED"
  | "DEPOSIT_RETURNED"
  | "USER_PAID"
  | "PAID_OWNER"
  | "DEPOSIT_RETURNED";
export type IPaymentMethod = "COD" | "BANK_TRANSFER" | "VNPAY";

interface IVoucherOrder {
  id: number;
  saleOrderId: number;
  voucherId: number;
  discountAmount: number;
}
export interface IListingOrder {
  id: number;
  title: string;
  deposit: number;
  price: number;
  description: string;
  quantity: number;
  address: string;
  book: IBook;
}

export interface ISaleOrder {
  saleOrder: IBuyOrder;
  listing: IListingOrder;
  Seller?: IUser;
  Buyer?: IUser;
  voucherShop: IVoucherOrder;
  voucherSession: IVoucherOrder;
  totalPrice?: number;
}

export interface IBuyOrderConvert {
  id?: number;
  listing?: IRowBuy[] | undefined;
  status?: IOrderStatusBuy;
  seller?: IUser;
  buyer?: IUser;
  sellerAddress?: string;
  buyerAddress?: string;
  receiveDate?: string | null;
  totalPrice?: number;
  totalChange?: number;
  totalCompensate?: number;
  totalPenaltyRate?: number | null;
  paymentMethod?: IPaymentMethod;
  sellPaymentId?: number;
  changePaymentId?: number;
  compensatePaymentId?: number | null;
  createdDate?: string;
}

export interface IBuyOrder {
  id?: number;
  listingId?: number;
  status?: IOrderStatusBuy;
  sellerId?: number;
  buyerId?: number;
  sellerAddress?: string;
  buyerAddress?: string;
  receiveDate?: string | null;
  totalPrice?: number;
  totalChange?: number;
  totalCompensate?: number;
  totalPenaltyRate?: number | null;
  paymentMethod?: IPaymentMethod;
  sellPaymentId?: number;
  changePaymentId?: number;
  compensatePaymentId?: number | null;
  createdDate?: string;
}

export interface IRentOrder {
  leaseOrder?: ILeaseOrder;
  listing?: IListing;
  lessor?: IUser;
  lessee?: IUser;
  totalPenaltyFee?: number;
}

interface ILeaseOrder {
  id: number;
  listingId: number;
  status: IOrderStatus;
  lessorId: number;
  lesseeId: number;
  lessorAddress: string;
  lesseeAddress: string;
  fromDate: string;
  toDate: string;
  receiveDate: null;
  returnDate: null;
  totalLeaseFee: number;
  totalPenaltyRate: number;
  totalDeposit: number;
  paymentMethod: IPaymentMethod;
  imageLink: null;
  leaseAndDepositPaymentId: number;
  refundDepositPaymentId: null;
  payOwnerPaymentId: null;
  createdDate: string;
  updatedDate: null;
  deletedDate: null;
  leaseOrderDetails: ILeaseOrderDetail[];
  reviews: IReview[];
}
export const orderUserTitles: Record<OrderType, string> = {
  [OrderType.Buy]: "Người mua",
  [OrderType.Sell]: "Người bán",
  [OrderType.Leasee]: "Người thuê",
  [OrderType.Leasor]: "Chủ sách",
};
export const orderStakeholderTitles: Record<OrderType, string> = {
  [OrderType.Buy]: orderUserTitles[OrderType.Sell],
  [OrderType.Sell]: orderUserTitles[OrderType.Buy],
  [OrderType.Leasee]: orderUserTitles[OrderType.Leasor],
  [OrderType.Leasor]: orderUserTitles[OrderType.Leasee],
};

export interface IOrderEmail {
  id: number;
  lessorName: string;
  phoneNumber: string;
  lessorAddress: string;
  createdDate: string;
  fromDate: string;
  toDate: string;
  duration: number;
  paymentMethod: string;
  totalLeaseFee: number;
  totalDeposit: number;
  buyerEmail: string;
};