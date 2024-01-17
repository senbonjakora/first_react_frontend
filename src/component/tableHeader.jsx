const TableHeader = (props) => {
  const { columns, onSort, sortColumn } = props;

  const raiseOnSort = (path) => {
    const sort = { ...sortColumn };

    if (sort.path === path) {
      sort.order = sort.order === "asc" ? "desc" : "asc";
    } else {
      sort.path = path;
      sort.order = "asc";
    }

    onSort(sort);
  };

  const renderSortIcon = (column) => {
    if(column.path !== sortColumn.path) return null;
    if(sortColumn.order === "asc" ) return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }

  return (
    <thead className="table-dark" style={{cursor: "pointer"}}>
      <tr>
        {columns.map((coloum) => (
          <th
            key={coloum.path || coloum.key}
            onClick={() => raiseOnSort(coloum.path)}
          >
            {coloum.label} {renderSortIcon(coloum)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
