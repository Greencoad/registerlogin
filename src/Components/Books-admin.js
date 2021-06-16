// import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const BooksAdmin = (props) => {
  const history = useHistory();
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location.state.name);
  // }, [location]);

  const addBooks = () => {
    history.push("/addbook");
  };

  const updateBooks = () => {
    history.push("/updatebook");
  };

  const deleteBooks = () => {
    history.push("/deletebook");
  };

  return (
    <div>
      <div>
        <button onClick={addBooks}>Add New Books</button>
        <button onClick={updateBooks}>update Books</button>
        <button onClick={deleteBooks}>delete Books</button>
      </div>
    </div>
  );
};

export default BooksAdmin;
