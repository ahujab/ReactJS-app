import React, { Component } from "react";
import { render } from "react-dom";

let bookList = [
  { title: "a", author: "b" },
  { title: "f", author: "n", pages: 30 },
  { title: "g", author: "m", pages: 80 }
];

const Books = ({
  title = "null",
  author = "null",
  pages = 0,
  freebookmark
}) => {
  return (
    <section>
      All Books!!!
      <h2>{title}</h2>
      <p>by {author}</p>
      <p> pages: {pages}</p>
      <p> Free bookmark:{freebookmark ? "yes" : "no"}</p>
    </section>
  );
};

const Hiring = () => (
  <div>
    <p> The lib is hiring . go to wwww.google.com/baks for more</p>
  </div>
);

const NotHiring = () => (
  <div>
    <p> The lib is not hiring . Come back later</p>
  </div>
);

class Library extends Component {
  state = {
    open: true,
    freebookmark: true,
    hiring: false,
    loading: false,
    data: []
  };
  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://hplussport.com/api/products/order/price/sort/asc/qty/1")
      .then(data => data.json())
      .then(data => this.setState({ data, loading: false }));
  }

  toggle = () => {
    this.setState(prevstate => ({
      open: !prevstate.open
    }));
  };
  render() {
    const { books } = this.props;

    return (
      <div>
        {this.state.loading ? (
          "loading..."
        ) : (
          <div>
            {this.state.data.map(product => {
              return (
                <div key={product.id}>
                  <h3>Library Product</h3>
                  <h4>{product.name}</h4>
                  <h5>Price: {product.price}</h5>
                  <img alt={product.name} src={product.image} height={100} />
                </div>
              );
            })}
          </div>
        )}

        <h1> library is {this.state.open ? "open" : "closed"}</h1>
        <h2>{this.state.hiring ? <Hiring /> : <NotHiring />}</h2>
        <button onClick={this.toggle}>Change state </button>
        {books.map(book => (
          <Books
            title={book.title}
            author={book.author}
            pages={book.pages}
            freebookmark={this.state.freebookmark}
          />
        ))}
      </div>
    );
  }
}

render(<Library books={bookList} />, document.getElementById("root"));
