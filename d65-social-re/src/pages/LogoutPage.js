import {Navigate} from "react-router-dom";

export const LogoutPage = () => {
  localStorage.removeItem("token")

  return <Navigate to="/login" replace={true}/>
};