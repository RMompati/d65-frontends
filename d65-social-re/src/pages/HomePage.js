import {useUser} from "../auth/useUser";
import {Navigate} from "react-router-dom";
import {NavigationBar} from "./NavigationBar";

export const HomePage = () => {
  const user = useUser();

  if (user) return <Navigate to="/dashboard" replace={true}/>
  return (
      <>
        {<NavigationBar/>}
        <div>
          <h1>Server Manager</h1>
        </div>
      </>
  );
}
