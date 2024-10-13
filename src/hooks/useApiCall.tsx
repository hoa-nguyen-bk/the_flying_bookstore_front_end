"use client";
import { useState } from 'react';
import { useStoreAlert } from './alert';

// Custom hook useApiCall
const useApiCall = <T,>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const { callAlert, callErrorAlert } = useStoreAlert();
  const handleApiCall = async (
    apiCall: () => Promise<T>,       // Hàm gọi API
    onSuccess: (data: T) => void,     // Hàm xử lý khi thành công
    successMessage?: string,
    failMessage?: string,
  ) => {
    setLoading(true);
    try {
      const response = await apiCall();

      if (typeof response === 'string') {
        // Gọi hàm alert khi có lỗi
        callErrorAlert(response);
      } else {
        // Xử lý khi API thành công
        onSuccess(response);
        callAlert(successMessage ? successMessage : "Gọi api thành công");
      }
    } catch (error) {
      console.error("Unexpected error during API call:", error);
      callErrorAlert(failMessage ? failMessage : "Gọi api thất bại");
    } finally {
      setLoading(false); // Tắt loading sau khi hoàn thành
    }
  };

  return { handleApiCall, loading };  // Trả về hàm và trạng thái loading
};

export default useApiCall;
