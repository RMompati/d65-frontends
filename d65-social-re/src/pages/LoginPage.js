import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useApiAuthPath} from "../util/useHost";
import {useToken} from "../auth/useToken";
import {NavigationBar} from "./NavigationBar";

export const LoginPage = () => {

  const navigate = useNavigate();

  const [apiAuthPath,] = useApiAuthPath();

  const [token, setToken] = useToken();

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (showErrorMessage) setShowErrorMessage(false);
    }, 5000)
  }, [showErrorMessage]);

  const [loginParams, setLoginParams] = useState({
    username: "",
    password: ""
  });

  const handleChange = (event) => {
    setLoginParams((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const onLogInClicked = async (event) => {

    await axios.post(`${apiAuthPath}/login`, loginParams)
        .then(response => response.data.data)
        .then(data => {
          const {auth} = data;
          return auth;
        })
        .then(data => {
          const {authenticationToken} = data;
          setToken(authenticationToken);

          navigate("/dashboard", {replace: true});
        })
        .catch(reason => {
          console.log("Failed...")
          setShowErrorMessage(true);
          console.log(reason)
        });
  }

  const onSignUpClicked = () => {
    navigate("/signup");
  }

  return (
      <>
        {<NavigationBar/>}
        <div className="row card shadow-sm h-100 w-50 text-center m-auto p-2 align-content-center">
          <h2>Log In</h2>

          {showErrorMessage &&
              <div className="alert alert-danger p-2 w-50 m-auto mb-3">Invalid username or password</div>}

          <form className="w-75 m-auto">

            <div className="form-floating mb-3">
              <input type="email" id="username" placeholder="example@mail.com"
                     name="username"
                     onChange={handleChange}
                     value={loginParams.username}
                     className="form-control"/>
              <label>Username</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" id="password" placeholder="example@mail.com"
                     name="password"
                     onChange={handleChange}
                     value={loginParams.password}
                     className="form-control"/>
              <label>Password</label>
            </div>

            <div className="d-grid gap-2 col-10 mx-auto">
              <button className="btn btn-lg btn-primary"
                      disabled={!loginParams.username || !loginParams.password}
                      onClick={onLogInClicked}>Log In
              </button>
              <button className="btn btn-secondary" onClick={onSignUpClicked}>Don't have an account yet? Sign Up
              </button>
            </div>
          </form>
        </div>
      </>
  );
}