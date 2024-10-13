import axios, { AxiosProgressEvent } from "axios";
import { port } from "../../utils/env";
import { handleError } from "../handleError";

const onCreateCopy = async (data: any) => {
    try {
        const respone = await axios.request({
            method: "POST",
            maxBodyLength: Infinity,
            url: `${port}/api/copy`,
            headers: {
                "Content-Type": "application/json",
            },
            data,
        })
        return respone
    }
    catch (error) {
        return handleError(error)
    }
};
const uploadFileService = async (formData: FormData, setUploadProgress: any) => {
    
    try {
        const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
            params: { key: "06112f8ddf44fb385b1d95d402e3e3a9" },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                const percentCompleted = progressEvent?.total
                    ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    : 100;
                setUploadProgress(percentCompleted);
            },
        })
        return response.data
    }
    catch (error) {
        return handleError(error)
    };
}
export { onCreateCopy, uploadFileService }