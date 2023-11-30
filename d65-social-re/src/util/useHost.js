import {useState} from "react";

export const useApiHost = () => {
  const [apiHost, setApiHost] = useState("http://localhost:5000");

  return [apiHost, setApiHost]
}

export const useApiHostPath = () => {
  const [apiHostPath, setApiHostPath] = useState("http://localhost:5000/api/v1/d65");

  return [apiHostPath, setApiHostPath]
}

export const useApiAuthPath = () => {
  const [authApi, setAuthApi] = useState("http://localhost:5000/api/v1/d65/auth");
  return [authApi, setAuthApi];
}
