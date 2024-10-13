import axios from "axios";
import { IUser } from "../types/user";
import { port } from "../utils/env";
import { handleError } from "./handleError";
const getListPostService = async (profile: IUser) => {
    try {
        const response = await axios.request({
            url: `${port}/api/listing/search/byOwnerId/` + profile.id,
        });
        return response.data;
    } catch (error) {
        return handleError(error)
    }
};

export { getListPostService }