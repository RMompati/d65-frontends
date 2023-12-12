import {useState} from "react";

export const useUserFields = () => {
  const [userFields, setUserFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  return [userFields, setUserFields];
}