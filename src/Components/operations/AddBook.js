import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddBook = (props) => {
  const history = useHistory();

  const [Bname, setBname] = useState("");
  const [Bdescription, setBdescription] = useState("");
  const [Bprice, setBprice] = useState("");
  const [Bimage, setBimage] = useState();

  const filepath = (event) => {
    setBimage(event.target.files[0]);
  };

  const uploadhandler = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("image", Bimage);

    fetch("http://localhost:3001/testApi/admin", {
      method: "POST",
      body: data,
    })
      .then((res) => console.log("file sent successfully"))
      .then((err) => {
        console.log(err);
      });
  };

  const namechange = (event) => {
    setBname(event.target.value);
  };
  const descriptionchange = (event) => {
    setBdescription(event.target.value);
  };
  const pricechange = (event) => {
    setBprice(event.target.value);
  };

  return (
    <div className="app">
      <form action="/testApi/admin" method="POST" encType="multipart/form-data">
        <label>Book name</label>
        <input type="text" value={Bname} onChange={namechange} />
        <label>Book description</label>
        <input type="text" value={Bdescription} onChange={descriptionchange} />
        <label>Book price</label>
        <input type="text" value={Bprice} onChange={pricechange} />
        <label>Book image</label>
        <input type="file" name="image" onChange={filepath} />
        <button onClick={uploadhandler}>upload</button>
        <button
          type="submit"
          onClick={() => {
            history.push({
              pathname: "/bookadmin",
              state: {
                name: Bname,
                description: Bdescription,
                price: Bprice,
              },
            });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
