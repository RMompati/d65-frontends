import {useState} from "react";

export const UserFieldsPage = ({
                                 userFields,
                                 setUserFields,
                                 submitFunction,
                                 submitBtnText,
                                 formHeading,
                                 feedbackMarkup,
                                 secondActionBtn
                               }) => {

  const handleChange = (event) => {
    setUserFields(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value
      }));
  }

  const isFormInValid = () => {
    return Object.values(userFields).every(value => value !== '');
  }

  const [confirmPasswordValue, setConfirmPasswordValue] = useState("")

  return (
      <>
        <div className="row card shadow-sm w-50 m-auto text-center my-auto p-2">
          <h1>{formHeading}</h1>
          {feedbackMarkup}
          <form className="m-auto text-center w-75">
            <div className="form-floating mb-3">
              <input type="text" id="first-name" placeholder="i.e, John"
                     name="firstName"
                     value={userFields.firstName}
                     onChange={handleChange}
                     className="form-control"/>
              <label>First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" id="last-name" placeholder="i.e, Doe"
                     name="lastName"
                     value={userFields.lastName}
                     onChange={handleChange}
                     className="form-control"/>
              <label>Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="email" id="email" placeholder="i.e, John.Doe@mail.com"
                     name="email"
                     value={userFields.email}
                     onChange={handleChange}
                     className="form-control"/>
              <label>Email</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" id="password" placeholder="12345"
                     name="password"
                     value={userFields.password}
                     onChange={handleChange}
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
              <button onClick={submitFunction}
                      disabled={!isFormInValid() || userFields.password !== confirmPasswordValue}
                      className="btn btn-primary">{submitBtnText}</button>
              { secondActionBtn }
            </div>
          </form>
        </div>
      </>
  );
};