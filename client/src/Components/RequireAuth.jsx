import {Navigate,useLocation,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../Redux/userSlice';
export default function RequireAuth() {
    const location= useLocation();
    const {user}=useSelector(userSelector);
  return (
    user? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
  )
}
