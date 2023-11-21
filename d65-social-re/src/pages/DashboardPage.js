import {useUser} from "../auth/useUser";
import {NavigationBar} from "./NavigationBar";

export const DashboardPage = () => {
  const user = useUser();

  const {username, exp, iat} = user;

  return (
     <>
       { <NavigationBar /> }
       <div>
         <h1>Dashboard</h1>
         <pre>{username} - {iat} - {exp} - {new Date(iat).toLocaleDateString()}</pre>
       </div>
     </>
  );
}