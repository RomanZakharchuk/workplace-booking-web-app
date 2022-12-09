import { AxiosRes, axiosService } from "./axios.service";
import { urls } from "../constants";

export const userService = {
    getUserProfile: (): AxiosRes<any> => axiosService.get(urls.usersProfile)
};