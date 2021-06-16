import { useState } from "react";
import { useHistory } from "react-router-dom";

const UpdateBook = (props) => {
  const history = useHistory();
  const [Bname, setBname] = useState("");
  const [Bprice, setBprice] = useState("");
  const [Bdescription, setBdescription] = useState("");
  // const Bimage = "";
  const [UBname, setUBname] = useState("");

  const namechange = (event) => {
    setBname(event.target.value);
  };
  const UBnamechange = (event) => {
    setUBname(event.target.value);
  };
  const descriptionchange = (event) => {
    setBdescription(event.target.value);
  };
  const pricechange = (event) => {
    setBprice(event.target.value);
  };

  const filepath = (event) => {
    let Bimage = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(Bimage[0]);

    reader.onload = (event) => {
      const imgUrl = event.target.result;
      const data = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { imgUrl },
      };
      fetch("http://localhost:3001/testApi/admin", data)
        .then((res) => res.json())
        .then((err) => {
          console.log(err);
        });
    };
  };

  // props.onUpdateBook(Bname, Bprice, Bdescription, UBname);
  return (
    <form>
      <label>enter Book name to update</label>
      <input type="text" value={UBname} onChange={UBnamechange} />
      <label>Book Name</label>
      <input type="text" value={Bname} onChange={namechange} />
      <label>Book description</label>
      <input type="text" value={Bdescription} onChange={descriptionchange} />
      <label>Book price</label>
      <input type="text" value={Bprice} onChange={pricechange} />
      <label>Book image</label>
      <input type="file" name="image" onChange={filepath} />
      <button
        type="submit"
        onClick={() => {
          history.push({
            pathname: "/books",
            state: {
              name: Bname,
              description: Bdescription,
              price: Bprice,
            },
          });
        }}
      >
        update
      </button>
    </form>
  );
};
export default UpdateBook;
