import axios from "axios";
import { IFrontEndError } from "../types/error";

const handleError = (error:unknown)=> {
  if (axios.isAxiosError<IFrontEndError, Record<string, unknown>>(error)) {
    if (error.response) {
      console.error("Axios error response:", { error });
      return "Lỗi từ server: " + error.response.status + " - " + error.response.data.title;
    } else if (error.request) {
      console.error("Axios error request:", error.request);
      return "Không có phản hồi từ server, vui lòng kiểm tra kết nối mạng";
    } else {
      console.error("Axios general error:", error.message);
      return "Lỗi axios: " + error.message;
    }
  } else if (error instanceof Error) {
    // Trường hợp các lỗi khác (ví dụ: lỗi runtime, cú pháp, etc.)
    console.error("General error:", error);
    return "Lỗi không xác định: " + error.message;
  } else {
    // Fallback cho trường hợp lỗi không rõ kiểu
    console.error("Unknown error type:", error);
    return "Lỗi không xác định";
  }
}
export {handleError}