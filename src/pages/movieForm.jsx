import { useEffect, useState } from "react";
import Input from "../component/input";
import Joi from "joi";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";
import Select from "../component/select";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MovieForm = () => {
  const allData = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  const schema = {
    _id: Joi.string(),
    title: Joi.string().min(4).max(100).required().label("Title"),
    genreId: Joi.string().required().label("Genres"),
    numberInStock: Joi.number().min(1).required().label("Number In Stock"),
    dailyRentalRate: Joi.number().min(1).max(5).required().label("Rate"),
  };

  const [state, setState] = useState(allData);

  let { data, genres, errors } = state;

  const { id } = useParams();

  const fetchData = async () => {
    const { data: genres } = await getGenres();
    setState({ ...state, genres });

    if (id === "new") return;

    const { data: movie } = await getMovie(id);

    setState({ ...state, genres, data: mapToViewModel(movie) });
  };

  useEffect(() => {
    // const genre = getGenres();
    // setState({ ...state, genres: genre });
    fetchData();

    //if (id === "new") return;

    //setState({ ...state, genres: genre, data: mapToViewModel(movie) });
  }, []);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genres._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const validateOnType = ({ name, value }) => {
    const locaSchema = Joi.object({ [name]: schema[name] });
    const { error } = locaSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  const handleOnChange = ({ currentTarget: input }) => {
    const error = { ...errors };

    const errorMessage = validateOnType(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const localData = { ...data };
    localData[input.name] = input.value;
    setState({ ...state, data: localData, errors: error });
  };

  const validate = () => {
    const localSchema = Joi.object({ ...schema });
    const { error } = localSchema.validate(data, { abortEarly: false });

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const saveMovieToDatabase = async (data) => {
    try {
      await saveMovie(data);
      toast("Submitted!");
      window.location = "/";
    } catch (ex) {
      console.log(ex.response.data);
      toast(ex.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();

    setState({ ...state, errors: errors || {} });

    if (errors) return;

    saveMovieToDatabase(data);

    console.log("Submitted");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="mt-3">Movie Form</h1>

        <Input
          name="title"
          label="Title"
          value={data.title}
          onChange={handleOnChange}
          error={errors.title}
        />

        <Select
          name="genreId"
          label="Genres"
          options={genres}
          onChange={handleOnChange}
          selectedGenre={data.genreId}
          error={errors.genreId}
        />

        <Input
          name="numberInStock"
          label="Number in Stock"
          value={data.numberInStock}
          onChange={handleOnChange}
          error={errors.numberInStock}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          value={data.dailyRentalRate}
          onChange={handleOnChange}
          error={errors.dailyRentalRate}
        />

        <button disabled={validate()} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
