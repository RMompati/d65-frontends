import {useEffect, useState} from "react";
import axios from "axios";
import {useApiHostPath} from "../util/useHost";
import {useMessage} from "../util/useMessage";
import {useToken} from "../auth/useToken";

export const AddNewServer = ({servers, setServers}) => {

  const [apiHostPath,] = useApiHostPath();
  const [token,] = useToken();

  const [isError, setIsError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useMessage();

  const [formData, setFormData] = useState({
    "name": "",
    "memory": "",
    "ipAddress": "",
    "status": "Server Status"
  });

  const handleInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  useEffect(() => {
    if (isError) {
      setTimeout(() => setIsError(false), 5000);
    }
  }, []);

  const saveServer = async () => {
    await axios.post(`${apiHostPath}/server/save`, formData, {headers: {Authorization: `Bearer ${token}`}})
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
                             name="name"
                             onChange={handleInputChange}
                             value={formData.name} />
                      <label>Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="i.e., Deployment Server"
                             name="memory"
                             onChange={handleInputChange}
                             value={formData.memory} />
                      <label>Memory(GB)</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="i.e., 127.0.0.1"
                             name="ipAddress"
                             onChange={handleInputChange}
                             value={formData.ipAddress}/>
                      <label>Ip Address</label>
                    </div>

                    <select id="server-status" className="form-select form-select-lg mb-3"
                            name="status"
                            onChange={handleInputChange}
                            value={formData.status}>
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