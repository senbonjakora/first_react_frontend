const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />

      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;
