"use client";
import Image from "next/image";
import Background from "@/assets/images/background.jpg";
import { Button, Slide, SlideProps, Divider} from "@mui/material";
import Link from "next/link";
import FormLogin from "@/components/auth/FormLogin";
import "./../Login.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/user";
import { IUserLogin } from "@/types/user";

import { handleFormSubmitService } from "@/api/auth/loginService";
import { useStoreAlert } from "../../../../hooks/alert";
import { getProfile } from "../../../../api/profile";

import { signIn } from "next-auth/react";
import GoogleButton from "@/components/auth/GoogleButton";
import GoogleIcon from "@/components/icons/GoogleIcon";


const Login = () => {
  const [formData, setFormData] = useState({} as IUserLogin);
  const { callAlert, callErrorAlert } = useStoreAlert();
  const router = useRouter();
  const { setToken } = useAuthStore();

  // 2. Add Google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/" });
      if (result?.error) {
        callErrorAlert(result.error);
      }
    } catch (error) {
      callErrorAlert("Đăng nhập bằng Google thất bại");
    }
  };

  const callApiProfile = async (token: string) => {
    try {
      const data = await getProfile(token, setToken);
      if (typeof data != "string") {
        callAlert("Đăng nhập thành công");
        router.push("/");
      } else {
        callErrorAlert(data);
      }
    } catch (error) {
      callErrorAlert("Đăng nhập thất bại")
    }
  };
  const handleFormSubmit = async () => {
    try {
      // Gọi service để xử lý form submit
      const data = await handleFormSubmitService(formData);

      // Kiểm tra nếu service trả về dữ liệu hợp lệ
      if (typeof data !== 'string' && data.token) {
        // Đăng ký thành công, tiếp tục xử lý với token
        await callApiProfile(data.token);
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

          <Divider sx={{ my: 2 }}>Hoặc</Divider>

          <Button
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{ 
              color: '#4285F4',
              borderColor: '#4285F4',
              '&:hover': {
                borderColor: '#357ABD',
                backgroundColor: 'rgba(66, 133, 244, 0.04)'
              }
            }}
            fullWidth
          >
            Đăng nhập bằng Google
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
