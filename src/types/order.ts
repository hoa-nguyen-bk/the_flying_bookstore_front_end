import { IListing, IReview } from "./book";
import { IUser } from "./user";
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

export interface IOrder {
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
