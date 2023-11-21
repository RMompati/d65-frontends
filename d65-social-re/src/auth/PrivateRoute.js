import {Navigate} from "react-router-dom";
import {useUser} from "./useUser";

export const PrivateRoute = ({outlet}) => {
  const user = useUser();

  if (!user) return <Navigate to="/login" replace={true} />

  return outlet;
}