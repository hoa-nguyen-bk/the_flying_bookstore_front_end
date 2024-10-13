import { Chip, Rating } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/helps";
import { CiEdit, CiTrash } from "react-icons/ci";
import theme from "../../utils/theme";
import { CiCircleInfo } from "react-icons/ci";
import Link from "next/link";
import { IBook, ICopy } from "../../types/book";

export interface IRowsPost2 {
  id: number;
  title: string;
  authors: IBook["authors"];
  leaseRate: number;
  depositFee: number;
  penaltyRate: number;
}
interface IRowDraft {
  id: number;
  ownerId: number;
  quantity: number;
  address: string;
  expiryDate: null | string;
  leaseRate: number;
  depositFee: number;
  penaltyRate: number;
  description: string;
  copy: ICopy;
  book: IBook;
}
export const convertDataToIRow = (data: IRowDraft[]) => {
  if (!data) return [];
  return data.map((item) => {
    const {
      book: { authors, title },
      leaseRate,
      depositFee,
      penaltyRate,
      id,
    } = item;
    const result: IRowsPost2 = {
      id,
      title,
      authors,
      leaseRate,
      depositFee,
      penaltyRate,
    };
    return result;
  });
};
const columnForBuy: GridColDef<IRowsPost2>[] = [
  {
    headerName: "Giá gốc",
    editable: false,
    field: "depositFee",
    width: 120,
    valueGetter: (value: number) => formatCurrency(value),
  },
  {
    headerName: "Giá bán",
    editable: false,
    field: "leaseRate",
    width: 120,
    valueGetter: (value: number) => formatCurrency(value),
  },

]
const columnForRent: GridColDef<IRowsPost2>[] = [
  {
    headerName: "Giá thuê",
    editable: false,
    field: "leaseRate",
    width: 120,
    valueGetter: (value: number) => `${formatCurrency(value)}/ngày`,
  },
  {
    headerName: "Tiền cọc",
    editable: false,
    field: "depositFee",
    width: 120,
    valueGetter: (value: number) => formatCurrency(value),
  },
  {
    headerName: "Tiền phạt",
    editable: false,
    field: "penaltyRate",
    width: 120,
    valueGetter: (value: number) => `${formatCurrency(value)}/ngày`,
  },
]
const columnForRentAndBuy: GridColDef<IRowsPost2>[] = [
  {
    headerName: "Giá thuê",
    editable: false,
    field: "leaseRate",
    width: 120,
    valueGetter: (value: number) => `${formatCurrency(value)}/ngày`,
  },
  {
    headerName: "Tiền cọc",
    editable: false,
    field: "depositFee",
    width: 120,
    valueGetter: (value: number) => formatCurrency(value),
  },
  {
    headerName: "Tiền phạt",
    editable: false,
    field: "penaltyRate",
    width: 120,
    valueGetter: (value: number) => `${formatCurrency(value)}/ngày`,
  }, {
    headerName: "Giá bán",
    editable: false,
    field: "price",
    width: 120,
    valueGetter: (value: number) => formatCurrency(value),
  },

]

export const columnsPost = (
  handleClickOpen: (arg: IRowsPost2) => void,
  tabPost: number
): GridColDef<IRowsPost2>[] => {
  return [
    {
      field: "id",
      headerName: "Id",
      width: 15,
      editable: false,
    },
    {
      field: "title",
      headerName: "Tên bài đăng",
      width: 100,
      editable: false,
    },
    {
      headerName: "Tác giả",
      field: "authors",
      editable: false,
      width: 150,
      sortable: false,
    },
    ...(tabPost == 2 ? columnForBuy : tabPost == 1 ? columnForRent : columnForRentAndBuy),
    {
      field: "actions",
      type: "actions",
      width: 150,
      getActions: (params: GridRowParams<IRowsPost2>) => [
        <Link href={`/detail/${params?.row?.id}`} key="1">
          <GridActionsCellItem
            icon={<CiCircleInfo size={20} />}
            label="Xem chi tiết"
            size="large"
          />
        </Link>,
        <Link href={`/manager-post/edit-post/${params?.row?.id}`} key="2">
          <GridActionsCellItem
            icon={<CiEdit size={20} />}
            label="Sửa"
            size="large"
          />
        </Link>,
        <GridActionsCellItem
          icon={<CiTrash size={20} color={theme.palette.error.main} />}
          key="3"
          label="Xóa"
          size="large"
          onClick={() => handleClickOpen(params?.row)}
        />,
      ],
    },
  ];
};
