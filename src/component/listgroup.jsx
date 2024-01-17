const ListGroup = (props) => {
  const { items, onItemSelect, selectedGenre } = props;

  return (
    <ul className="list-group mt-2">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item.name}
          className={
            item === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => {
            onItemSelect(item);
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
