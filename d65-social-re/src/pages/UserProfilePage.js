import {useUser} from "../auth/useUser";
import {useApiAuthPath} from "../util/useHost";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUserFields} from "../util/useUserFields";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

export const UserProfilePage = () => {
  const user = useUser();
  const [apiAuthPath, _] = useApiAuthPath();
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState("");

  const loadUser = async (event) => {
    event.preventDefault();
    const {username} = user;

    await axios.get(`${apiAuthPath}/user/${username}`, userFieldsProps.userFields)
        .then(value => value.data)
        .then(data => {
          const {message} = data
          setResponseMessage(message)
          const {user} = data;
          console.log(user)
          setUserFields(user);
        })
        .catch(reason => {
          const {message} = reason.response.data
          setResponseMessage(message);
        });
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    setUserFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    loadUser().then(() => {});

  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (responseMessage) {
        setResponseMessage("");
      }
    }, 5000);
  }, [responseMessage]);

  const FeedbackMarkup = () => (
      <>
        { responseMessage &&
            <div className={`alert alert-info p-1 w-75 align-self-center`}> { responseMessage } </div>}
      </>
  );

  const onCancelClicked = () => {
    navigate("/dashboard");
  }
  const SecondActionBtn = () => (<button onClick={onCancelClicked} className="btn btn-secondary">Cancel</button>);

  const [userFields, setUserFields] = useUserFields();

  let userFieldsProps = {
    "userFields": userFields,
    "setUserFields": setUserFields,
  }


  return (
      <></>
  );
}