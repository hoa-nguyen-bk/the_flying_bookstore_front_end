import axios from "axios";
import { port } from "../utils/env";

const genreSliceService = async () => {
    console.log({ port });

    return await axios.request({
        url: `${port}/api/genre`, 
        headers: {
            "Referrer-Policy": "unsafe-url",
        },
    }).then(response => response.data)
        .catch(error => console.log(error));
}
export { genreSliceService }