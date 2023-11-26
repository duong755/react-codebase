import axios from "axios";
import { stringify } from "qs";

export const defaultAxios = axios.create({
  baseURL: "",
  timeout: 30000,
  paramsSerializer: (params, options) => {
    return stringify(params, { arrayFormat: "repeat", indices: options?.indexes ?? undefined });
  },
});
