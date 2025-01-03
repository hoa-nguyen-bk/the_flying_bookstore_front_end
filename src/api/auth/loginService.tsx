import axios from "axios";
import { IUserLogin } from "@/types/user";
import { headerAxios, port } from "../../utils/env";
import { handleError } from "../handleError";


const handleFormSubmitService = async (formData: IUserLogin) => {
  try {
    const response = await axios.request({
      method: "POST",
      headers: {
        ...headerAxios,
        "Content-Type": "application/json",
      },
      data: formData,
      url: `${port}/api/user/login`,
    });
    return response.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export { handleFormSubmitService }