import useInput from "../Hooks/use-input";

const RegisterForm = (props) => {
  const {
    value: enteredEmail,
    hasError: emailInputHasErrors,
    isValid: enteredEmailIsValid,
    valueInputHandler: emailInputHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordInputHasErrors,
    isValid: enteredPasswordIsValid,
    valueInputHandler: passwordInputHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  const clickHandler = async () => {
    const datas = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    };
    await fetch("http://localhost:3001/testApi", datas)
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

    resetEmailInput();
    resetPasswordInput();
  };

  const nameInputClasses = passwordInputHasErrors
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasErrors
    ? "form-control invalid"
    : "form-control";

  return (
    <div>
      <div className="title">
        <p>Register</p>
      </div>
      <form onSubmit={submissionHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="name">Email</label>
          <input
            type="email"
            id="email"
            onChange={emailInputHandler}
            value={enteredEmail}
            onBlur={emailInputBlurHandler}
          />
          {emailInputHasErrors && (
            <p className="error-text">
              Email must have @ sign and it cannot be empty
            </p>
          )}
        </div>
        <div className={nameInputClasses}>
          <label htmlFor="name">Password</label>
          <input
            type="text"
            id="password"
            onChange={passwordInputHandler}
            value={enteredPassword}
            onBlur={passwordInputBlurHandler}
          />
          {passwordInputHasErrors && (
            <p className="error-text">password cannot be Empty..!</p>
          )}
        </div>
        <div className="form-actions">
          <button onClick={clickHandler} disabled={!formIsValid}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
