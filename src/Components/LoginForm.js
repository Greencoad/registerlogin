import { useState } from "react";
import { useHistory } from "react-router-dom";
import Books from "./Books";
import BooksAdmin from "./Books-admin";

const LoginForm = (props) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [booksList, setBooksList] = useState([
    {
      name: "",
      price: "",
      description: "",
      image: "",
    },
  ]);

  const [user, setUser] = useState("");

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
    // post req
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
      .then((data) => {
        window.localStorage.setItem("authdata", data.token);
      })
      .then((err) => {
        console.log(err);
      });
  };

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const submissionHandler = (event) => {
    event.preventDefault();

    // get req
    const localdatas = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("authdata"),
      },
    };
    fetch("http://localhost:3001/testApi/books", localdatas)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const map1 = data.map((x) => x.name);
        console.log(map1[0]);
        if (map1[0] === "user") {
          setUser("user");
        } else {
          if (map1[0] === "admin") {
            setUser("admin");
          }
        }
      })
      .then((err) => {
        console.log(err);
      });

    if (!enteredPasswordIsValid) {
      return;
    }
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  let history = useHistory();

  if (user === "user") {
    history.push("/books");
  } else {
    if (user === "admin") {
      history.push("/bookadmin");
    }
  }

  const PasswordInputClasses = PasswordInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  // const location = useLocation();
  // const gotdata = useEffect(() => {
  //   console.log(location.state.Bname);
  // }, [location]);

  // handeling the operations on book
  const onBookAddHandler = (Bname, Bprice, Bdescription, Bimage) => {
    setBooksList((prevBookList) => {
      return [
        ...prevBookList,
        {
          name: Bname,
          price: Bprice,
          description: Bdescription,
          image: Bimage,
        },
      ];
    });
  };

  const onBookUpdateHandler = (Bname, Bprice, Bdescription, Bimage, UBname) => {
    setBooksList((prevBookList) => {
      const update = prevBookList.filter(
        (item) => {
          item.name = Bname;
          item.price = Bprice;
          item.description = Bdescription;
          item.image = Bimage;
          return { item };
        },
        { name: UBname }
      );
      return [...prevBookList, { update }];
    });
  };

  const onBookDeleteHandler = (UBname) => {
    setBooksList((prevBookList) => {
      const newBook = prevBookList.filter((item) => {
        return item.name !== UBname;
      });
      return newBook;
    });
  };

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
      <div>
        <Books books={booksList} />
      </div>
      <div>
        <BooksAdmin
          onAddBook={onBookAddHandler}
          onUpdatBook={onBookUpdateHandler}
          onDeleteBook={onBookDeleteHandler}
        />
      </div>
    </div>
  );
};

export default LoginForm;
