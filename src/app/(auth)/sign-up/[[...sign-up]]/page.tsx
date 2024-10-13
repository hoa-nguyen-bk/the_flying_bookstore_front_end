"use client";
import Image from "next/image";
import Background from "@/assets/images/bg-signin_animation.gif";
import { Button, Box, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Input, FormHelperText } from "@mui/material";
import Link from "next/link";
import "./../../login/Login.scss";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { onSubmitService } from "@/api/auth/registerService";
import { IUser } from "@/types/user";
import { useStoreAlert } from "../../../../hooks/alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
  const router = useRouter();
  const { callAlert, callErrorAlert } = useStoreAlert();
  // Trạng thái của checkbox điều khoản dịch vụ
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  interface IFormInput {
    username: string;
    password: string;
    repeatPassword: string;
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Hàm xử lý submit form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const req: IUser = {
        username: data.username,
        password: data.password || null, // Nếu không có mật khẩu, có thể sử dụng null
        id: 0, // Bạn có thể đặt giá trị mặc định cho id nếu chưa có
        email: "", // Đảm bảo email không để trống
        phoneNumber: "", // Đảm bảo số điện thoại không để trống
        firstName: "", // Đảm bảo firstName có giá trị mặc định
        lastName: "", // Đảm bảo lastName có giá trị mặc định
        birthDate: "", // Đảm bảo ngày sinh có giá trị
        avatarUrl: null,  // Nếu không có avatar, sử dụng null
        address: "" // Đảm bảo địa chỉ không để trống
      };

      const response = await onSubmitService(req);

      if (typeof response !== 'string' && !!response) {
        callAlert("Đăng ký thành công");
        // Registration successful, handle the response accordingly
        router.push("/login");
      } else {
        // Trường hợp không có token trong response
        callErrorAlert(response);
      }
    } catch (error: unknown) {
      console.error("Lỗi không xác định:", error);
      callErrorAlert("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
    };
  }

  // Hàm xử lý thay đổi checkbox
  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Lấy giá trị của password để so sánh với repeatPassword
  const password = watch("password");

  return (
    <div className="auth">
      <div className="auth__left ">
        <h2 className="">Đăng ký</h2>
        <div className="auth__form ">
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Trường Username */}
            <TextField
              label="Tên đăng nhập"
              error={!!errors.username}
              helperText={errors.username ? "Tên người dùng là bắt buộc và phải có từ 3 đến 20 ký tự" : ""}
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 20
              })}
              sx={{ width: "100%" }}
              margin="dense"
              variant="standard"
            />

            {/* Trường Password */}
            <FormControl
              variant="standard"
              sx={{ width: "100%" }}
              margin="normal"
            >
              <InputLabel htmlFor="standard-adornment-password">Mật khẩu</InputLabel>
              <Input
                {...register('password', {
                  required: true,
                  minLength: 8,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/
                })}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText error>{errors.password ? "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt" : ""}</FormHelperText>
              )}
            </FormControl>

            {/* Trường Repeat Password */}
            <FormControl
              variant="standard"
              sx={{ width: "100%" }}
              required
              margin="normal"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <Input
                {...register('repeatPassword', {
                  required: true,
                  validate: value => value === password // So sánh với password
                })}
                id="standard-adornment-password"
                type={showRepeatPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowRepeatPassword((state) => !state)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.repeatPassword && (
                <FormHelperText error>{errors.repeatPassword ? (errors.repeatPassword.type === "validate" ? "Mật khẩu không khớp" : "Cần phải lặp lại mật khẩu") : ""}</FormHelperText>
              )}
            </FormControl>

            <div>Đọc <Link href={`/private-policy`}><span className="text-primary font-semibold">Điều khoản bảo mật</span></Link> </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  name="terms"
                  color="primary"
                />
              }
              label="Tôi đồng ý với Điều khoản bảo mật"
            />
            {/* Nút submit */}
            <Button type="submit" variant="contained" color="primary" disabled={!termsAccepted} fullWidth>
              Đăng ký
            </Button>
          </Box>
          <div className="flex">
            <p className="text-gray-500">Có tài khoản rồi?</p>
            <Link href="/login">
              <p className="text-secondary mx-1">Đăng nhập</p>
            </Link>
            <p className="text-gray-500">nhé</p>
          </div>
        </div>
      </div>
      <div className="auth__right">
        <Image src={Background} unoptimized alt="background" fill className="img" />
      </div>

    </div>
  );
};

export default SignIn;
