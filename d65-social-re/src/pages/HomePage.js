import {useUser} from "../auth/useUser";
import {Link, Navigate} from "react-router-dom";
import {NavigationBar} from "./NavigationBar";
import {useEffect, useState} from "react";

export const HomePage = () => {
  const user = useUser();

  // if (user) return <Navigate to="/dashboard" replace={true}/>

  const ListOfImageUrl = [1027, 1011, 1013, 1004, 996, 886, 666, 444, 777];
  const cdnName = "https://unsplash.it/160/160?image=";

  const labelsAndUrls = [
    {label: "About", url: "/about"},
    {label: "Log In", url: "/login"},
    {label: "Sign Up", url: "/signup"},
    {label: "Servers", url: "/servers"}
  ];


  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      toggleOptions();
    }, 100);

    return () => clearTimeout(timeOutId);
  }, []);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const rotate = (rotationAngle=-360) => {
    return {
      transform: `rotate(${rotationAngle}deg)`,
    };
  };

  const  createListItems = () => {
    return labelsAndUrls.map(({label, url}, index) => {
      const rotationAngle = isOpen ? (index * (360 / labelsAndUrls.length)) : -360;
      return (
          <li key={index} style={rotate(rotationAngle)}>
            <Link to={url} style={rotate(-rotationAngle)}>{label}</Link>
          </li>
      )
    });
  }

  return (
      <>
        <div className="h-100 w-100 m-auto text-center">
          <div className="circlemenu">
            <div className={ `selector ${isOpen ? 'open' : ''}` }>
              <ul>
                { createListItems() }
              </ul>
              <button onClick={toggleOptions}>Server Manager</button>
            </div>
          </div>
        </div>
      </>
  );
}
