import {useUser} from "../auth/useUser";
import {NavigationBar} from "./NavigationBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {useApiHostPath} from "../util/useHost";
import {useToken} from "../auth/useToken";
import {useServers} from "../util/useServers";
import {useMessage} from "../util/useMessage";
import {AddNewServer} from "./AddNewServer";

export const DashboardPage = () => {
  const user = useUser();
  const [apiHostPath,] = useApiHostPath();
  const [token,] = useToken();

  const [loading, setLoading] = useState(false);
  const [pingLoading, setPingLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const {username, firstName, lasName, exp, iat} = user;

  const [message, setMessage] = useMessage()
  const [servers, setServers] = useServers()

  const loadServers = async () => {

    setLoading(true);
    await axios.get(`${apiHostPath}/server/list`, {headers: {Authorization: `Bearer ${token}`}})
        .then(value => value.data)
        .then(data => {
          setLoading(false);
          const {servers} = data.data;
          const {message} = data;
          setMessage(message);
          setServers(servers);

        }).catch(reason => {
          console.log(reason);
          const {message} = reason.response.data;
          setErrorMessage(message);
          setLoading(false);
        });
  };
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 10000);
    }
  }, [message]);

  useEffect(() => {
    const _ = loadServers();
  }, []);

  const pingServer = async (serverId) => {

    setPingLoading(true);
    await axios.get(`${apiHostPath}/server/ping/${serverId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(value => value.data)
        .then(data => {
          setPingLoading(false);
          const {message} = data;
          setMessage(message);
        });
  };


  return (
      <>
        {<NavigationBar/>}
        {loading &&
            <div className="row m-auto" style={{width: "32px", height: "128px"}}>
              <div className="row col m-auto spinner-grow align-self-center">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
        }

        {(!loading && !errorMessage) &&
            <div className="row">
              <div className="row">
                <h3 className="col-2">Your Servers</h3>
                {message &&
                    <div className="col-8">
                      <div className="alert alert-success text-center p-1 m-auto w-50">{message}</div>
                    </div>
                }
                <button type="button" className="ms-auto col-2 btn btn-outline-secondary" data-backdrop='static' data-keyboard='false' data-bs-toggle="modal" data-bs-target="#addServerModal"><i className="bi bi-database-add"></i> Add
                  New Server
                </button>
              </div>
              <div className="row col w-75 m-auto text-center">
                <table className="table table-striped table-hover">
                  <thead>
                  <tr key="xxx">
                    <th scope="col">#</th>
                    <th>Server Name</th>
                    <th>Ip Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    servers.map((server, index) => {

                      return (
                          <tr className="align-middle fw-normal fs-6" key={index} >
                            <th scope="row">{index}</th>
                            <th>{server.name}</th>
                            <th>{server.ipAddress}</th>
                            <th className={`${server.status === "SERVER_UP" ? 'text-bg-success' : 'text-bg-danger'}`}>{server.status === "SERVER_UP" ? "Server Up" : "Server Down"}</th>
                            <th className="d-grid gap-1">
                              <button className="btn btn-outline-secondary btn-sm"
                                      onClick={() => pingServer(server.ipAddress)}
                                      disabled={pingLoading}><i className={`${pingLoading ? 'spinner-grow spinner-grow-sm' : 'bi bi-router'}`}></i> Ping
                              </button>
                              <button className="btn btn-outline-danger btn-sm"><i className="bi bi-trash"></i> Delete
                              </button>
                            </th>
                          </tr>
                      )
                    })
                  }
                  </tbody>
                </table>

                {
                  <AddNewServer />
                }
              </div>
            </div>
        }

        {
            errorMessage &&
            <div className="fs-4 fw-bold text-center">{errorMessage}</div>
        }
      </>
  );
}