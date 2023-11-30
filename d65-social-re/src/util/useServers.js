import {useState} from "react";

export const useServers = () => {

  const [servers, setServers] = useState([{}]);

  return [servers, setServers]
}