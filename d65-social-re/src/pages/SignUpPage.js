import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useApiAuthPath} from "../util/useHost";
import {NavigationBar} from "./NavigationBar";

export const SignUpPage = () => {

  const [apiAuthPath, _] = useApiAuthPath();
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState("");
  const [activateAccount, setActivateAccount] = useState(false);

  useEffect(() => {
    setTimeout(() => {
     if (activateAccount) {
       setResponseMessage("");
       setActivateAccount(false)
       navigate("/activate-account");
     }
    }, 5000);
  }, [activateAccount, responseMessage]);


  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const onSignUpClicked = async (event) => {
    event.preventDefault();

    const signUpData = {
      "firstName": firstNameValue,
      "lastName": lastNameValue,
      "email": emailValue,
      "password": passwordValue,
    }

    await axios.post(`${apiAuthPath}/register`, signUpData)
        .then(value => value.data)
        .then(data => {
          const {message} = data
          setResponseMessage(message)
          setActivateAccount(true);
        })
        .catch(reason => {
          setActivateAccount(false);
          const {message} = reason.response.data
          setResponseMessage(message);
        });
    // navigate("/login");
  };

  const onLogInClicked = () => {
    navigate("/login");
  };

  return (
      <>
        { <NavigationBar /> }
        <div className="row card shadow-sm w-50 m-auto text-center my-auto p-2">
          <h1>Sign Up</h1>
          { responseMessage &&
              <div className={(activateAccount ? "alert alert-success" : "alert alert-danger") + " p-1 w-75 align-self-center"}> { responseMessage } </div>}
          <form className="m-auto text-center w-75">
            <div className="form-floating mb-3">
              <input type="text" id="first-name" placeholder="i.e, John"
                     value={firstNameValue}
                     onChange={ event => setFirstNameValue(event.target.value) }
                     className="form-control"/>
              <label>First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" id="last-name" placeholder="i.e, Doe"
                     value={lastNameValue}
                     onChange={ event => setLastNameValue(event.target.value) }
                     className="form-control"/>
              <label>Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="email" id="email" placeholder="i.e, John.Doe@mail.com"
                     value={emailValue}
                     onChange={ event => setEmailValue(event.target.value) }
                     className="form-control"/>
              <label>Email</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" id="password" placeholder="12345"
                     value={passwordValue}
                     onChange={ event => setPasswordValue(event.target.value) }
                     className="form-control"/>
              <label>Password</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" id="confirm-password" placeholder="12345"
                     value={confirmPasswordValue}
                     onChange={ event => setConfirmPasswordValue(event.target.value) }
                     className="form-control"/>
              <label>Confirm Password</label>
            </div>

            <div className="d-grid gap-2 col-10 mx-auto">
              <button onClick={onSignUpClicked}
                      disabled={!firstNameValue || !lastNameValue || !emailValue || !passwordValue || passwordValue !== confirmPasswordValue}
                      className="btn btn-primary">Sign Up</button>
              <button onClick={onLogInClicked} className="btn btn-secondary">Already have an account? Log In</button>
            </div>
          </form>
        </div>
      </>
  );
};
