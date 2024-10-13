import { ICategory } from "./category";
import { IUser } from "./user";

export type IListing = {
  id: number;
  ownerId: number | null;
  quantity: number;
  address: string;
  expiryDate: string | null;
  leaseRate: number;
  depositFee: number;
  penaltyRate: number;
  description: string;
  copy: ICopy;
  book: IBook;
  review?: Array<IReview>;
  bookOwned?: number;
  bookLeasing?: number;
  user: IUser;
  price?: number;
  allowRent?: number;
  allowPurchase?: number;
};

export interface ICopy {
  id: number;
  bookId: number;
  ownerId: number | null;
  quantity: number;
  imageLink: string;
  damagePercent: number;
  createdDate: string | null;
  updatedDate: string | null;
  deletedDate: string | null;
  copyStatus: "LEASED" | "AVAILABLE"; // Assuming these are the only possible values for copy status
  allow_purchase: number;
  allow_rent: number;
}
export type IBook = {
  id?: number;
  isbn: string;
  title: string;
  authors: string[];
  languageCode: string;
  genre: string[] | ICategory[];
  publisher: string;
  publishedDate: string;
  pageCount?: number;
  size: string;
  
};

export interface IReview {
  id: number;
  score: number;
  description: string;
  imageLink: string | null;
  leaseOrderId: number;
  userId: number;
  listingId: number;
  createdDate: string;
  updatedDate: string | null;
  deletedDate: string | null;
}
