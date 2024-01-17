const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      className="form-control my-3"
      type="text"
      placeholder="Search..."
      aria-label="default input example"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
