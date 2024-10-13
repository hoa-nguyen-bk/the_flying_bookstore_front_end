import { IListing, IReview } from "@/types/book";

const chunkArray = (array: Array<any>, chunkSize: number) => {
  const chunks = [];
  if (chunkSize >= array.length) {
    return array;
  }
  for (let i = 0; i < chunkSize; i++) {
    const newPush = array.slice(i, i + 1);
    chunks.push(newPush[0]);
  }
  return chunks;
};

const formatCurrency = (amount: number | undefined) => {
  if (!amount) return 0 + "đ";
  // Chuyển số tiền thành chuỗi và thêm dấu chấm phẩy giữa các hàng nghìn
  const formattedAmount = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm ký tự đơn vị tiền tệ (VND)
  return formattedAmount + "đ";
};
const arrayToString = (arr: Array<string> | undefined) => {
  if (!arr) return "";
  return arr.map(
    (item, index) => `${item}${index == arr.length - 1 ? "" : ", "}`
  );
};

const countAvarageReview = (arrayReview: Array<IReview> | undefined) => {
  if (!arrayReview) return 0;
  const totalScore = arrayReview.reduce(
    (accumulator, review) => accumulator + review.score,
    0
  );
  const avarage = totalScore / arrayReview.length;
  const roundedAverageScore = Math.round(avarage * 2) / 2;
  return roundedAverageScore | 0;
};
function formatPhoneNumber(phoneNumber: string | undefined) {
  if (!phoneNumber) return phoneNumber;
  // Định dạng số điện thoại thành (0x) xxx-xxx-xxx hoặc (0x) xxxx-xxx-xxx
  return phoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{3})/, "$1$2 $3 $4");
}
const calPercentPromotion = (book: IListing | undefined): number => {
  if (!book || book.price === undefined) return 0;
  return Math.round(100 - (book.price * 100) / book.depositFee);
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export {
  a11yProps,
  chunkArray,
  formatCurrency,
  arrayToString,
  countAvarageReview,
  formatPhoneNumber,
  calPercentPromotion
};
