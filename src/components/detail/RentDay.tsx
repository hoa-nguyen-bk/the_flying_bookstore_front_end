"use client";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Button } from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { IPropsBook } from "./DocumentInfo";
import { formatCurrency } from "@/utils/helps";
import { Controller, useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import { ICart, IFormValueDayRent } from "@/types/cart";
import { useStoreCart } from "@/hooks/cart";
import { useRouter } from "next/navigation";


const tomorrow = dayjs().add(1, "day");
const RentDay = ({ book }: IPropsBook) => {
  const { handleSubmit, control, watch } = useForm<IFormValueDayRent>({
    defaultValues: {
      dateStart: dayjs(),
      dateEnd: null,
    },
  });
  const router = useRouter()
  const addToCart = useStoreCart(state=>state.addCart)
  const renderDurationRent = () => {
    const dateStart = watch("dateStart");
    const dateEnd = watch("dateEnd");
    if (!dateStart || !dateEnd) return 0;
    const duration = dateEnd.diff(dateStart, "day");
    return duration;
  };
  const renderTotalRent = () => {
    const duration = renderDurationRent();
    if (!book?.leaseRate) return 0;
    return duration * book?.leaseRate;
  };
  const renderCountTotal = () =>{
    const totalRent = renderTotalRent();
    if(!book?.depositFee || totalRent == 0) return 0;
    return book?.depositFee + totalRent;
  }
  const onSubmit = (data: IFormValueDayRent) => {
    if(!book) return;
    const submitCart: ICart = {
      dayRent:data,
      book,
      total: renderCountTotal(),
      totalRent: renderTotalRent(),
      duration: renderDurationRent()
    }
    
    addToCart(submitCart);
    router.push("/cart")
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-y py-5">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              viVN.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <Controller
              control={control}
              name="dateStart"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <DatePicker
                    sx={{ width: "100%", mb: 2 }}
                    label="Ngày nhận"
                    value={field.value}
                    inputRef={field.ref}
                    format="DD/MM/YYYY"
                    disablePast
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="dateEnd"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Ngày trả"
                    value={field.value}
                    inputRef={field.ref}
                    format="DD/MM/YYYY"
                    minDate={tomorrow}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                );
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="flex flex-col gap-2 border-b pt-3 pb-2">
          <div className="columns-2">
            <p className="text-sm">Giá thuê</p>
            <p className="font-semibold text-right">
              {formatCurrency(book?.leaseRate)}/ngày
            </p>
          </div>
          <div className="columns-2">
            <p className="text-sm">Số ngày thuê</p>
            <p className="font-semibold text-right">{renderDurationRent()}</p>
          </div>
        </div>
        <div className="columns-2 mt-3">
          <p className="text-sm">Tổng tiền thuê</p>
          <p className="font-semibold text-right">{formatCurrency(renderTotalRent())}</p>
        </div>
        <div className="columns-2 border-b py-3">
          <p className="text-sm">Tiền cọc</p>
          <p className="font-semibold text-right">{formatCurrency(book?.depositFee)}</p>
        </div>
        <div className="columns-2 my-2">
          <p className="font-semibold text-lg">Tổng tiền</p>
          <p className="font-semibold text-right text-lg">{formatCurrency(renderCountTotal())}</p>
        </div>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
          disabled={renderCountTotal() == 0? true:false}
          sx={{ width: "100%", color: "white" }}
          startIcon={<CiShoppingCart />}
        >
          Đặt thuê ngay
        </Button>
      </form>
    </>
  );
};

export default RentDay;
