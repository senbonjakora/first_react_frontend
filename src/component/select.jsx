const Select = (props) => {
  const { options, label, onChange, name, error, selectedGenre } = props;
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-control form-select-lg mb-3"
        aria-label="Select Genres"
        value={selectedGenre}
        onChange={onChange}
      >
        <option value="" />

        {options.map((option) => (
          <option
           // selected={selectedGenre === option._id}
            key={option._id}
            value={option._id}
          >
            {option.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Select;
