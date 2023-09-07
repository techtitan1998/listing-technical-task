import axios, { AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "./Url";

export const Api = async <T>(
  method: string,
  route: string,
  data?: any
): Promise<AxiosResponse<T> | AxiosError<any>> => {
  try {
    const response = await axios({
      method: method,
      url: `${API_BASE_URL}${route}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err;
    } else {
      throw err;
    }
  }
};
