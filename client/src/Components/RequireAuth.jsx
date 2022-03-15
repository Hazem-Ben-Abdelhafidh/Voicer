import {Navigate,useLocation,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../Redux/userSlice';
export default function RequireAuth() {
    const location= useLocation();
    const {username}=useSelector(userSelector);
  return (
    username? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
  )
}
