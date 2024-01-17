import lodesh from "lodash";
import { Link } from "react-router-dom";

const TableBody = (props) => {
  const { data, columns } = props;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.path === "title") {
      return (
        <Link style={{ textDecoration: "none" }} to={`/register/${item._id}`}>
          {lodesh.get(item, column.path)}
        </Link>
      );
    }

    return lodesh.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={item._id + (column.path || column.key)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
