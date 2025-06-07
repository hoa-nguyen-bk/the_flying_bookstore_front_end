import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import RentDay from "./RentDay";
import RentCombo from "./RentCombo";
import Owner from "./Owner";
import { IPropsBook } from "./DocumentInfo";
import { calPercentPromotion, formatCurrency } from "@/utils/helps";
import { CiShoppingCart } from "react-icons/ci";
import { Alert, Chip } from "@mui/material";
import { ICart, ICartBook, ICartBuy } from "../../types/cart";
import { useStoreCart } from "../../hooks/cart";
import { useRouter } from "next/navigation";
import { useStoreStep } from "../../hooks/step";
import { useAuthStore } from "../../hooks/user";

const RentBook = ({ book }: IPropsBook) => {
  const router = useRouter();
  const { profile } = useAuthStore();
  const addToCart = useStoreCart((state) => state.addCartBuy);
  const { changeTabNum } = useStoreStep();

  const handleAddToCartBuy = () => {
    if (!book?.id) return;
    const submitCart: ICartBuy = {
      bookId: book.id,
      totalBuy: book.price
    };
    changeTabNum(1)
    addToCart(submitCart);
    router.push("/cart");
  }
  const renderRentAccordion = () => {
    if (book?.penaltyRate == 0 && book?.leaseRate == 0) {
      return <></>;
    }
    return (
      <>
        <h3 className="text-xl font-bold text-primary mb-4">Đặt thuê</h3>
        <Accordion sx={{ backgroundColor: "white", borderRadius: 2 }} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className="flex justify-between items-center w-full mr-2">
              <h5 className="font-semibold">Thuê theo ngày</h5>
              <p className="text-sm">{formatCurrency(book?.leaseRate)}/ngày</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <RentDay book={book} />
          </AccordionDetails>
        </Accordion>
      </>

    );
  }
  const renderPriceAccordion = () => {
    if (book?.price == 0) {
      return <></>;
    }
    return (
      <>
        <h3 className="text-xl font-bold text-primary mb-4">Đặt mua</h3>
        <Accordion sx={{ backgroundColor: "white", borderRadius: 2 }} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className="flex justify-between items-center w-full mr-2">
              <h5 className="font-semibold">Mua sách với giá</h5>
              <p className="text-sm font-semibold ">{formatCurrency(book?.price)}</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-2 border-b pb-5">
              <div className="columns-2">
                <Chip label={`Giảm được ${calPercentPromotion(book)}`} color="success" variant="outlined" />
                <p className=" text-right line-through text-gray-400">
                  {formatCurrency(book?.depositFee)}
                </p>
              </div>
            </div>
            {profile?.id == book?.user.id ? (
              <Alert severity="info">
                Đây là sách của bạn, bạn không thể thêm vào giỏ hàng
              </Alert>
            ) : (<Button
              variant="contained"
              color="secondary"
              size="large"
              type="submit"
              sx={{ width: "100%", color: "white" }}
              startIcon={<CiShoppingCart />}
              onClick={handleAddToCartBuy}
            >
              Mua ngay
            </Button>)}

          </AccordionDetails>
        </Accordion>
      </>);
  }
  return (
    <div className="">

      {renderRentAccordion()}
      {renderPriceAccordion()}
      <Owner book={book} />
    </div>
  );
};

export default RentBook;
