"use client";
import Image from "next/image";
import Background from "@/assets/images/background.jpg";
import { Button, Slide, SlideProps } from "@mui/material";
import Link from "next/link";
import FormLogin from "@/components/auth/FormLogin";
import "./../Login.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/user";
import { IUserLogin } from "@/types/user";

import { getProfileService, handleFormSubmitService } from "@/api/auth/loginService";
import { useStoreAlert } from "../../../../hooks/alert";


const Login = () => {
  const [formData, setFormData] = useState({} as IUserLogin);
  const { callAlert , callErrorAlert} = useStoreAlert();
  const router = useRouter();
  const { setToken } = useAuthStore();
  const getProfile = async (token: string) => {
    const data = await getProfileService(token);
    if (data) {
      setToken(token, data);
      callAlert("Đăng nhập thành công");
      router.push("/");
    }
  };
  const handleFormSubmit = async () => {
    try {
      // Gọi service để xử lý form submit
      const data = await handleFormSubmitService(formData);
  
      // Kiểm tra nếu service trả về dữ liệu hợp lệ
      if (typeof data !== 'string' && data.token) {
        // Đăng ký thành công, tiếp tục xử lý với token
        await getProfile(data.token);
        callAlert("Đăng nhập thành công");
      } else {
        // Trường hợp không có token trong response
        callErrorAlert(data);
      }
    } catch (error: unknown) {
      callErrorAlert("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
    }
  };

  return (
    <div className="auth">
      <div className="auth__left ">
        <h2 className="">Đăng nhập</h2>
        <div className="auth__form ">
          <FormLogin setFormData={setFormData} formData={formData} />

          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ color: "white" }}
            size="large"
          >
            Đăng nhập
          </Button>
          <div className="flex">
            <p className="text-gray-500">Không có tài khoản?</p>
            <Link href="/sign-up">
              <p className="text-secondary mx-1">Đăng ký</p>
            </Link>
            <p className="text-gray-500">nhé</p>
          </div>
        </div>
      </div>
      <div className="auth__right">
        <Image src={Background} alt="background" fill className="img" />
      </div>
     
    </div>
  );
};

export default Login;
