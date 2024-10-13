"use client";
import { Button } from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/user";
import { useStoreStep } from "../../hooks/step";
import "./Cart.scss"
import InfoCheckout from "./InfoCheckout";
import { useStoreAlert } from "../../hooks/alert";

const CartInfo = () => {
  const router = useRouter();
  const { isLogin } = useAuthStore();
  const { resetStep, tabNum } = useStoreStep()
  const { callErrorAlert } = useStoreAlert();

  const onClickNavigate = () => {
    if (isLogin) {
      resetStep();
      router.push("/checkout");
    } else {
      callErrorAlert("Bạn cần đăng nhập trước");
    }
  };


  return (
    <div className="border py-8 px-8 rounded-lg">
      <h3 className="text-xl font-semibold">Thông tin đặt hàng</h3>
      <div className="columns-2 gap-10 my-4">
        <InfoCheckout />
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="secondary"
          sx={{ color: "white" }}
          size="large"
          startIcon={<CiShoppingCart />}
          onClick={onClickNavigate}
        >
          Đặt {tabNum == 1 ? `mua` : `thuê`} hàng
        </Button>
      </div>
    </div>
  );
};

export default CartInfo;
