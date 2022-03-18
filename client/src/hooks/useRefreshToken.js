import axios from "../api/axios";
import {useDispatch,useSelector } from "react-redux";
import {getNewToken} from './../Redux/userSlice';
export default function useRefreshToken() {
  const refresh = async () => {
    const response = await axios.get("/users/refreshToken", {
      withCredentials: true,
    });
    useDispatch(getNewToken(response.data.accessToken));
  };
  return refresh;
}
