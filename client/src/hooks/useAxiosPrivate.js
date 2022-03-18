import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import { userSelector } from "./../../Redux/userSlice";
export default function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const{user}= useSelector(userSelector);
  useEffect(() => {
    const requestIntercept= axiosPrivate.interceptors.request.use(
        config=>{
            if(!config.headers['Authorization']){
                config.headers['Authorization']= `Bearer ${refresh}`;
            }
            return config;
        }, (error)=>{
            Promise.reject(error);
        }
    );


    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if(error?.response?.status=== 403 && !prevRequest?.sent){
            prevRequest.sent= true;
            const newAccessToken= await refresh();
            prevRequest.headers['Authorization']= `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return ()=>{
        axiosPrivate.interceptors.response.eject(responseIntercept);
        axiosPrivate.interceptors.request.eject(requestIntercept);
    }
  }, [refresh,user]);
  return axiosPrivate;
}
