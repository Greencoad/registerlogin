const Books = (props) => {
  return (
    <div className="app">
      <div className="bookcard">
        <div className="card">
          <div>
            <h1>List of Books</h1>
          </div>
          <ul>
            {props.books.map((book) => (
              <li>
                name:{book.name} (price:₹{book.price}) (description:
                {book.description}) (image:{book.image})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Books;
