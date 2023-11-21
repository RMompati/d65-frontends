import {useToken} from "./useToken";
import {useEffect, useState} from "react";

export const useUser = () => {
  const [token, ] = useToken();

  const username = null;

  const getUsernameFromToken = (token) => {
    const encodeUsername = token.split(".")[1];
    return JSON.parse(atob(encodeUsername));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;

    return getUsernameFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getUsernameFromToken(token));
    }
  }, [token]);

  return user;
}
