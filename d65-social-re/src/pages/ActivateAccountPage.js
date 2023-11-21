import {useEffect, useState} from "react";
import axios from "axios";
import {useApiAuthPath} from "../util/useHost";
import {useNavigate} from "react-router-dom";

export const ActivateAccountPage = () => {

  const navigate = useNavigate();

  const [apiAuthPath, ] = useApiAuthPath();

  const [responseMessage, setResponseMessage] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (responseMessage) {
        setResponseMessage("");
        setIsErrorMsg(false)
        navigate("/login");
      }
    }, 5000);
  }, [responseMessage]);

  const [activationCode, setActivationCode] = useState("");

  const onActivateAccountClicked = async (event) => {
    event.preventDefault();

    await axios.get(`${apiAuthPath}/activate/${activationCode}`)
        .then(value => value.data)
        .then(data => {
          const {message} = data
          setResponseMessage(message)
        })
        .catch(reason => {
          setIsErrorMsg(true)
          const {message} = reason.response.data
          setResponseMessage(message);
        });
  };

  return (
      <div className="row card shadow-sm w-50 m-auto text-center my-auto p-2">
        <h3>Account Activation</h3>
        {responseMessage &&
            <div className={(!isErrorMsg ? "alert alert-success" : "alert alert-danger") + " p-1 w-75 align-self-center"}> { responseMessage } </div>}
        <div className="text-muted fw-bold mb-1 p-2 align-self-center">Please check your emails for the activation code.</div>
        <form className="w-75 m-auto">
          <div className="form-floating mb-3">
            <input type="text" id="code" placeholder="i.e., xxxjhjak"
                   className="form-control w-50"
                   value={activationCode}
                   onChange={ event => setActivationCode(event.target.value) } />
            <label>Activation Code</label>
          </div>

          <button className="btn btn-primary" onClick={onActivateAccountClicked}>Activate Account</button>
        </form>
      </div>
  );
}