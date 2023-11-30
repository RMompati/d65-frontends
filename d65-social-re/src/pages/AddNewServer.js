import {useEffect, useState} from "react";
import axios from "axios";
import {useApiHostPath} from "../util/useHost";
import {useMessage} from "../util/useMessage";
import {useServers} from "../util/useServers";
import {useToken} from "../auth/useToken";

export const AddNewServer = () => {

  const [apiHostPath,] = useApiHostPath();
  const [token,] = useToken();

  const [isError, setIsError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useMessage();
  const [servers, setServers] = useServers()

  const [serverName, setServerName] = useState("");
  const [serverMemory, setServerMemory] = useState("");
  const [serverIpAddress, setServerIpAddress] = useState("");
  const [serverStatus, setServerStatus] = useState("Server Status");

  useEffect(() => {
    if (isError) {
      setTimeout(() => setIsError(false), 5000);
    }
  }, []);

  const saveServer = async () => {
    const data = {
      name: serverName,
      memory: serverMemory,
      ipAddress: serverIpAddress,
      status: serverStatus
    };

    await axios.post(`${apiHostPath}/server/save`, data, {headers: {Authorization: `Bearer ${token}`}})
        .then(value => value.data)
        .then(data => {
          const {message} = data;
          const {server} = data.data;

          setIsError(false)
          setFeedbackMessage(message);
          setServers([...servers, server]);
        })
        .catch(reason => {
          setIsError(true)
          console.log(reason)
          const {message} = reason.response;
          setFeedbackMessage(message);
        });
  }

  return (
      <>
        <div className="modal fade" id="addServerModal" data-bs-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="addServerLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addServerLabel">Add New Server</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form>
                <div className="modal-body">
                  {
                      feedbackMessage && <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} w-50 m-auto p-1 mb-2`}>{feedbackMessage}</div>
                  }
                  <div className="w-75 m-auto">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="i.e., Deployment Server"
                             onChange={event => setServerName(event.target.value)}
                             value={serverName} />
                      <label>Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="i.e., Deployment Server"
                             onChange={event => setServerMemory(event.target.value)}
                             value={serverMemory} />
                      <label>Memory(GB)</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="i.e., 127.0.0.1"
                             onChange={event => setServerIpAddress(event.target.value)}
                             value={serverIpAddress}/>
                      <label>Ip Address</label>
                    </div>

                    <select id="server-status" className="form-select form-select-lg mb-3"
                            onChange={event => setServerStatus(event.target.value)}
                            value={serverStatus}>
                      <option defaultValue disabled>Server Status</option>
                      <option value="SERVER_UP">Server Up</option>
                      <option  value="SERVER_DOWN">Server Down</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" >Close</button>
                  <button type="button" className="btn btn-outline-success" onClick={saveServer}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
  );
}