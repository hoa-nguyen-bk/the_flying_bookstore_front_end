import { ICart, ICartBook, ICartBuy, ICartRent } from "@/types/cart";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseStoreCart {
  cart: ICart;
  addCartRent: (newCart: ICartRent) => void;
  addCartBuy: (newCart: ICartBuy) => void;
  removeCartRent: () => void;
  removeCartBuy: () => void;
}
const initCart = {
  buy: null,
  rent: null
}
const cartSlice: StateCreator<IUseStoreCart, [["zustand/persist", unknown]]> = (
  set
) => ({
  cart: initCart,
  addCartRent: (newCart) => {
    set((state) => ({ cart: { rent: newCart, buy: state?.cart?.buy } }));
  },
  addCartBuy: (newCart) => {
    set((state) => ({ cart: { buy: newCart, rent: state?.cart?.rent } }));
  },
  removeCartRent: () => set((state)=>({cart:{rent:null,buy:state?.cart?.buy}})),
  removeCartBuy: () => set((state)=>({cart:{buy:null,rent:state?.cart?.rent}})),
});
export const useStoreCart = create<IUseStoreCart>()(
  persist(cartSlice, {
    name: "cart-storage", // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage),
  })
);
