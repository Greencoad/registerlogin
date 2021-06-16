import { useState } from "react";

const DeleteBook = (props) => {
  const [UBname, setUBname] = useState("");
  //   props.onDeleteBook(UBname);
  const UBnamechange = (event) => {
    setUBname(event.target.value);
  };
  return (
    <form>
      <label>enter Name of Book to delete</label>
      <input type="text" value={UBname} onChange={UBnamechange} />
      <button type="submit">delete</button>
    </form>
  );
};

export default DeleteBook;
