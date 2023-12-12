import {NavigationBar} from "./NavigationBar";
import {useUser} from "../auth/useUser";
import {Navigate} from "react-router-dom";

export const AboutPage = () => {
  const user = useUser();

  return user
      ? (
          <Navigate to={"/dashboard"} />
      ) : (
      <>
        { <NavigationBar /> }
        
        <div>
          <h3>About Us</h3>
        </div>
      </>
  );
}