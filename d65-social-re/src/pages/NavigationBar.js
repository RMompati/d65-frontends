import {Link} from "react-router-dom";
import {useUser} from "../auth/useUser";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.js"

export const NavigationBar = () => {
  const user = useUser();

  return (
      <header className="navbar navbar-expand-lg sticky-top mb-3">
        <nav className="container-xxl g-5 flex-wrap flex-lg-nowrap">
          <Link className="navbar-brand" to="/" >Server Manager</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#appNavigation" aria-controls="appNavigation" aria-expanded="false"
                  aria-label="Toggle Navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="appNavigation">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/about">About</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              { !user && <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li> }
              { !user && <li className="nav-item"><Link className="nav-link" to="/login">Log In</Link></li> }
              { user &&
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-person-circle" style={{fontSize: "24px", marginTop: "0"}}></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="dropdown-item">Profile</li>
                      <li className="dropdown-item">
                        <Link className="btn btn-outline-danger btn-sm" to="/logout"><i className="bi bi-box-arrow-right"></i> Log Out</Link>
                      </li>
                    </ul>
                  </li>
              }
              {/*{ user &&*/}
              {/*    <li className="nav-item">*/}
              {/*      <Link className="btn btn-outline-danger" to="/logout"><i className="bi bi-box-arrow-right"></i> Log Out</Link>*/}
              {/*    </li>*/}
              {/*}*/}
            </ul>
          </div>
        </nav>
      </header>
  );
};
