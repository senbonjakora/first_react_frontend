import auth from "../services/authService";
import Like from "./like";
import Table from "./table";

const MoviesTable = (props) => {
  const { items, onLike, onDelete, OnSort, sortColumn } = props;

  let columns = [
    { path: "title", label: "Title" },
    { path: "genres.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <Like handlLike={() => onLike(movie)} liked={movie.liked} />
      ),
    },
  ];

  const deleteColumn = {
    key: "Delete",
    content: (movie) => (
      <button
        onClick={() => {
          onDelete(movie);
        }}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };
  const user = auth.getCurrentUser();
  if (user && user.admin) {
    columns.push(deleteColumn);
  }

  return (
    <Table
      onSort={OnSort}
      sortColumn={sortColumn}
      columns={columns}
      data={items}
    />
  );
};

export default MoviesTable;
