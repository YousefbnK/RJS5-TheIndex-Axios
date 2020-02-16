import React from "react";

const BookRow = props => {
  const book = props.book;
  const authorList = book.authors.length;
  const authorName =
    authorList > 1
      ? book.authors.map(author => <div>{author.name}</div>)
      : props.authorName;
  return (
    <tr>
      <td>{book.title}</td>
      <td>
        <div>{authorName}</div>
      </td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
};

export default BookRow;
