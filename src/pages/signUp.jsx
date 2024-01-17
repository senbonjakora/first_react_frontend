import { useState } from "react";
import Input from "../component/input";
import { register } from "../services/userService";
import Joi from "joi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";

const SignUp = () => {
  const userType = {
    data: {
      username: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(userType);
  const { data: account, errors } = user;

  const schema = {
    username: Joi.string().required().min(4).max(255).label("Username"),
    email: Joi.string()
      .email({ tlds: false })
      .required()
      .min(5)
      .max(100)
      .label("Email"),
    password: Joi.string().required().min(5).max(255).label("Password"),
  };

  const validate = () => {
    const option = { abortEarly: false };
    const localSchema = Joi.object({ ...schema });
    const { error } = localSchema.validate(account, option);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const validateTypes = ({ name, value }) => {
    const locaSchema = Joi.object({ [name]: schema[name] });

    const { error } = locaSchema.validate({ [name]: value });

    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    setUser({ ...user, errors: errors || {} });

    if (errors) return;

    try {
      const result = await register(account);
      auth.loginWithJsonWebToken(result.headers["x-auth-token"]);
      toast(result.statusText);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...user.errors };
        errors.email = ex.response.data;
        setUser({ ...user, errors: errors });
        toast(ex.response.data);
      }
    }
  };

  const handleOnChange = ({ currentTarget: input }) => {
    const error = { ...errors };
    const errorMassage = validateTypes(input);

    if (errorMassage) error[input.name] = errorMassage;
    else delete error[input.name];

    const account = { ...user.data };
    account[input.name] = input.value;
    setUser({ ...user, data: account, errors: error });
  };

  return (
    <div className="m-4">
      <h1 className="mb-4">Register</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={handleOnChange}
          error={errors.username}
        />

        <Input
          name="email"
          label="Email"
          value={account.email}
          onChange={handleOnChange}
          error={errors.email}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          value={account.password}
          onChange={handleOnChange}
          error={errors.password}
        />

        <button disabled={validate()} className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
