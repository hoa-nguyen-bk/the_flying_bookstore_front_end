import { Box, Button } from "@mui/material";
import InfoRent from "./InfoRent";
import Pay from "./Pay";
import "./Step.scss";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthStore } from "@/hooks/user";
import { IFormCheckout } from "@/types/form";
import dayjs from "dayjs";
// import { VNPay } from "vnpay";
import { useStoreCart } from "@/hooks/cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStoreOrder } from "../../hooks/order";
import { getProfile, onSubmitProfile } from "../../api/profile";
import { useStoreAlert } from "../../hooks/alert";
import { onSubmitOrderService } from "@/api/checkoutService";
import InfoCheckout from "../cart/InfoCheckout";
import CartItem from "../cart/CartItem";
import { useStoreStep } from "../../hooks/step";

// const vnpay = new VNPay({
//   tmnCode: process.env.TMN_CODE || "",
//   secureSecret: process.env.SECURE_SECRET || "",
//   vnpayHost: process.env.VNPAY_HOST || "",
// });

const convertPaymentType = (paymentType: number) => {
  switch (paymentType) {
    case 0:
      return "COD";
    case 1:
      return "BANK_TRANSFER";
    case 2:
      return "VNPAY";
    default:
      break;
  }
};
const Step1 = ({ handleNext }: { handleNext: () => void }) => {
  const { tabNum } = useStoreStep();
  const { callAlert, callErrorAlert } = useStoreAlert();
  const { profile, token, setToken } = useAuthStore();
  const { updateOrder } = useStoreOrder();
  const { cart } = useStoreCart();
  const router = useRouter();
  const [payType, setPayType] = useState<number>(0);
  const methods = useForm<IFormCheckout>();
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitSuccessful },
    reset,
  } = methods;

  useEffect(() => {
    const defaultValues: IFormCheckout = {
      lastName: profile?.lastName || "",
      firstName: profile?.firstName || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
      address: profile?.address || "",
      birthDate: profile?.birthDate ? dayjs(profile.birthDate) : null,
    };
    reset(defaultValues);
  }, [profile?.address, profile?.birthDate, profile?.email, profile?.firstName, profile?.lastName, profile?.phoneNumber, reset]);

  useEffect(() => {
    getProfile(token, setToken);
  }, [setToken, token]);

  const onSubmitOrder = async () => {
    const data = getValues();

    const convertValue = {
      status: "ORDERED_PAYMENT_PENDING",
      listingId: cart?.rent?.bookId,
      lesseeId: profile?.id,
      lesseeAddress: data.address,
      fromDate: dayjs(cart?.rent?.dayRent.dateStart).format("YYYY-MM-DD"),
      toDate: dayjs(cart?.rent?.dayRent.dateEnd).format("YYYY-MM-DD"),
      paymentMethod: convertPaymentType(payType),
    };

    // const response = await onSubmitOrderService(convertValue, token); // TODO: có api thì nhớ revert lại
    const response= demoRes.leaseOrder;
    if (response) {
      callAlert("Tạo đơn hàng thành công");
      updateOrder(response?.id);
      handleNext();
      if (payType == 2) {
        // TODO: VNPay
      }
    }
  };
  const beforeOnSubmitProfile = async (data: IFormCheckout) => {
    return await onSubmitProfile(data, profile, token).then((res) => {
      callAlert(
        "Xác nhận thông tin thành công, mời bạn chọn thanh toán rồi tạo đơn hàng"
      );
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(beforeOnSubmitProfile)}>
        <div className="step mt-8 grid grid-cols-2">
          {/* thông tin đặt thuê */}
          <div className="card ">
            <h3 className="">Thông tin đặt {tabNum == 1 ? "mua" : "thuê"}</h3>
            <InfoRent />
            <h3 className="mt-10">Thông tin đặt hàng</h3>
            <InfoCheckout />
          </div>
          <div className="card">
            <h3 className="">Thông tin sản phẩm</h3>
            <CartItem isCheckout={true} />
            <h3 className="mt-10">Thanh toán</h3>
            <Pay payType={payType} setPayType={setPayType} />
          </div>
        </div>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 5 }}>
          <Link href={"/cart"}>
            <Button color="inherit" variant="outlined" size="large">
              Quay lại giỏ hàng
            </Button>
          </Link>
          <Box sx={{ flex: "1 1 auto" }} />

           <Button
            size="large"

            variant="contained"
            onClick={onSubmitOrder}
          >
            Tạo đơn hàng
          </Button> 
        </Box>
      </form>
    </FormProvider>
  );
};

export default Step1;

const demoRes = {
  "leaseOrder": {
    "id": 2,
    "listingId": 2,
    "status": "ORDERED_PAYMENT_PENDING",
    "lessorId": 2,
    "lesseeId": 1,
    "lessorAddress": "Đường Kim Giang, Phường Kim Giang, Quận Thanh Xuân, Hà Nội",
    "lesseeAddress": "123 Nguyễn Trọng Tuyển, phường 12, quận Bình Thạnh",
    "fromDate": "2024-05-28",
    "toDate": "2024-07-09",
    "receiveDate": null,
    "returnDate": null,
    "totalLeaseFee": 9000.00,
    "totalPenaltyRate": 4600.00,
    "totalDeposit": 414800.00,
    "paymentMethod": "BANK_TRANSFER",
    "imageLink": null,
    "leaseAndDepositPaymentId": 2,
    "refundDepositPaymentId": null,
    "payOwnerPaymentId": null,
    "createdDate": "2024-10-03",
    "updatedDate": null,
    "deletedDate": null,
    "leaseOrderDetails": [
      {
        "id": 2,
        "title": "From Potter's Field",
        "listingId": 2,
        "leaseRate": 2800.00,
        "depositFee": 414800.00,
        "penaltyRate": 4600.00
      }
    ],
    "reviews": []
  },
  "listing": {
    "id": 2,
    "user": {
      "id": 1,
      "username": "dev",
      "email": "dev@app.local",
      "phoneNumber": "0905907362",
      "firstName": "Dev",
      "lastName": "Developer",
      "birthDate": "2017-03-14",
      "avatarUrl": "https://loremflickr.com/640/480/cats?lock=72704",
      "address": "123 Nguyễn Trọng Tuyển, phường 12, quận Bình Thạnh",
      "password": null
    },
    "quantity": 2,
    "address": "Đường Kim Giang, Phường Kim Giang, Quận Thanh Xuân, Hà Nội",
    "leaseRate": 2800.00,
    "depositFee": 414800.00,
    "penaltyRate": 4600.00,
    "description": "Dr. Kay Scarpetta matches wits with a sadistic killer who infiltrates the FBI's top-secret artificial intelligence system and closes in on Scarpetta herself.Christmas has never been a particularly good time for Dr Kay Scarpetta. Although a holiday for most, the festivities always seem to heighten the alienation felt by society&aposs violent fringe; and that usually means more work for Scarpetta, Virginia&aposs Chief Medical Examiner and consulting forensic pathologist for the FBI.The body was naked, female, and found propped against a\r\nChristmas has never been a particularly good time for Dr Kay Scarpetta. Although a holiday for most, the festivities always seem to heighten the alienation felt by society's violent fringe; and that usually means more work for Scarpetta, Virginia's Chief Medical Examiner and consulting forensic pathologist for the FBI.The body was naked, female, and found propped against a fountain in a bleak area of New York's Central Park. Her apparent manner of death points to a modus operandi that is chillingly familar: the gunshot wound to the head, the sections of skin excised from the body, the displayed corpse - all suggest that Temple Brooks Gault, Scarpetta's nemesis, is back at work.Calling on all her reserves of courage and skill, and the able assistance of colleagues Marino and Wesley, Scarpetta must track this most dangerous of killers in pursuit of survival as well as justice - heading inexorably to an electrifying climax amid the dark, menacing labyrinths of the New York subway.\r\n...more",
    "copy": {
      "id": 2,
      "bookId": 6,
      "ownerId": 1,
      "quantity": 2,
      "imageLink": "http://books.google.com/books/content?id=YJ18PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      "allowRent": 1,
      "allowPurchase": 1,
      "damagePercent": 2.0,
      "createdDate": null,
      "updatedDate": null,
      "deletedDate": null,
      "copyStatus": "LISTED"
    },
    "book": {
      "id": 6,
      "isbn": "2005018",
      "title": "From Potter's Field",
      "authors": [
        "Patricia Daniels Cornwell"
      ],
      "languageCode": "en",
      "genre": [
        "Mystery",
        "Fiction",
        "Mystery",
        "Crime",
        "Thriller",
        "Thriller",
        "Mystery Thriller",
        "Suspense",
        "Mystery",
        "Murder Mystery",
        "Mystery",
        "Detective",
        "Adult",
        "Audiobook"
      ],
      "publisher": "Oxford University Press",
      "publishedDate": "1995-01-01",
      "pageCount": 340,
      "size": "15.5x20.5"
    },
    "review": [],
    "bookOwned": 989,
    "bookLeasing": 1
  },
  "lessor": {
    "id": 2,
    "username": "dev0",
    "email": "Tracy47@yahoo.com",
    "phoneNumber": "0905907362",
    "firstName": "Tracy",
    "lastName": "Braun",
    "birthDate": "2017-03-14",
    "avatarUrl": "https://loremflickr.com/640/480/cats?lock=72704",
    "address": "Đường Kim Giang, Phường Kim Giang, Quận Thanh Xuân, Hà Nội",
    "password": null
  },
  "lessee": {
    "id": 1,
    "username": "dev",
    "email": "dev@app.local",
    "phoneNumber": "0905907362",
    "firstName": "Dev",
    "lastName": "Developer",
    "birthDate": "2017-03-14",
    "avatarUrl": "https://loremflickr.com/640/480/cats?lock=72704",
    "address": "123 Nguyễn Trọng Tuyển, phường 12, quận Bình Thạnh",
    "password": null
  },
  "totalPenaltyFee": 395600.00
}