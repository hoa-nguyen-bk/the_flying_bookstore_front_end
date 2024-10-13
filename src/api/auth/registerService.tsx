import axios from "axios";
import { IUser } from "@/types/user";
import { port } from "../../utils/env";
import { handleError } from "../handleError";

const onSubmitService = async (data: IUser) => {
  try {
    const response = await axios.request({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referrer-Policy": "unsafe-url" ,
      },
      url: `${port}/api/user/register`,
      data: {
        username: data.username,
        password: data.password,
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
      },
    });
    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};
export { onSubmitService }