import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "./NavigationBar";
import {UserFieldsPage} from "./UserFieldsPage";
import {useUserFields} from "../util/useUserFields";
import axios from "axios";
import {useApiAuthPath} from "../util/useHost";

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

  const FeedbackMarkup = () => (
      <>
        { responseMessage &&
            <div className={`${activateAccount ? 'alert alert-success' : 'alert alert-danger'} p-1 w-75 align-self-center`}> { responseMessage } </div>}
      </>
  );
  const SecondActionBtn = () => (<button onClick={onLogInClicked} className="btn btn-secondary">Already have an account? Log In</button>);

  const [userFields, setUserFields] = useUserFields();

  let userFieldsProps = {
    "userFields": userFields,
    "setUserFields": setUserFields,
  }

  const onSignUpClicked = async (event) => {
    event.preventDefault();

    await axios.post(`${apiAuthPath}/register`, userFieldsProps.userFields)
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
  };

  const onLogInClicked = () => {
    navigate("/login");
  };

  userFieldsProps = {
    ...userFieldsProps,
    "submitFunction": onSignUpClicked,
    "submitBtnText": "Sign Up",
    "formHeading":  "Sign Up",
    "feedbackMarkup": <FeedbackMarkup />,
    secondActionBtn: <SecondActionBtn />
  }

  return (
      <>
        {<NavigationBar/>}
        {<UserFieldsPage {...userFieldsProps}/>}
      </>
  );
};
