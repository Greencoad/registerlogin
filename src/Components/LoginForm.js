import { useState } from "react";

const LoginForm = (props) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredPasswordIsValid = enteredPassword.trim() !== "";
  const PasswordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const enteredEmailIsValid = enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const PasswordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const PasswordInputBlurHandler = (event) => {
    setEnteredPasswordTouched(true);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const clickHandler = async () => {
    const datas = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    };
    await fetch("http://localhost:3001/testApi/login", datas)
      .then((res) => res.json())
      .then((err) => {
        console.log(err);
      });
  };

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const submissionHandler = (event) => {
    event.preventDefault();

    if (!enteredPasswordIsValid) {
      return;
    }

    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  const PasswordInputClasses = PasswordInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <div>
      <div>
        <p className="title">Login</p>
      </div>
      <form onSubmit={submissionHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
            value={enteredEmail}
          />
          {emailInputIsInvalid && (
            <p className="error-text">Email must have @</p>
          )}
        </div>

        <div className={PasswordInputClasses}>
          <label htmlFor="Password">Your Password</label>
          <input
            type="text"
            id="Password"
            onChange={PasswordInputChangeHandler}
            onBlur={PasswordInputBlurHandler}
            value={enteredPassword}
          />
          {PasswordInputIsInvalid && (
            <p className="error-text">Password must not be empty.</p>
          )}
        </div>
        <div className="form-actions">
          <button onClick={clickHandler} disabled={!formIsValid}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
