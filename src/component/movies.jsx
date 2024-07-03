import React, { useEffect, useState, Component } from "react";
import Pagination from "./pagination";
import Paginate from "../utilities/paginate";
import { genres, getGenres } from "../services/genreService";
import { getAllMovies, deleteMovie } from "../services/movieService";
import ListGroup from "./listgroup";
import MoviesTable from "./moviesTable";
import _, { get } from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";

const Movies = ({ user }) => {
  const state = {
    movies: [],
    allGenre: [],
    selectedGenre: genres,
    searchQuery: "",
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" },
  };

  let [pageState, setMovieStates] = useState(state);

  let {
    movies,
    currentPage,
    pageSize,
    allGenre,
    searchQuery,
    selectedGenre,
    sortColumn,
  } = pageState;

  const handleDelete = async (movie) => {
    const mMovie = [...movies];
    const filteredMovies = mMovie.filter((m) => m._id !== movie._id);
    setMovieStates({ ...pageState, movies: filteredMovies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie already deleted!");
      }

      setMovieStates({ ...pageState, movies: mMovie });
    }
  };

  const handleLikeButtonClick = (movie) => {
    const mMovies = [...movies];
    const movieIndex = mMovies.indexOf(movie);
    mMovies[movieIndex] = { ...mMovies[movieIndex] };
    mMovies[movieIndex].liked = !mMovies[movieIndex].liked;

    setMovieStates({ ...pageState, movies: mMovies });
  };

  const handleOnPageChange = (page) => {
    setMovieStates({ ...pageState, currentPage: page });
  };

  const fetchData = async () => {
    const { data: genres } = await getGenres();

    const { data: movies } = await getAllMovies();

    setMovieStates({
      ...pageState,
      movies: movies,
      allGenre: [{ name: "All Genres" }, ...genres],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenreSelect = (genre) =>
    setMovieStates({
      ...pageState,
      selectedGenre: genre,
      searchQuery: "",
      currentPage: 1,
    });

  const handleOnSort = (sortColumn) => {
    setMovieStates({ ...pageState, sortColumn });
  };

  const handleSearch = (query) => {
    console.log(query);
    setMovieStates({
      ...pageState,
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  let filteredMovies = movies;
  if (searchQuery) {
    filteredMovies = movies.filter((m) =>
      m.title.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())
    );
  } else if (selectedGenre && selectedGenre._id) {
    filteredMovies = movies.filter((m) => m.genres._id === selectedGenre._id);
  }

  const sortedMovies = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  const paginatedMovies = Paginate(sortedMovies, currentPage, pageSize);

  return (
    <div className="row">
      <div className="col-3 ms-3">
        <ListGroup
          items={allGenre}
          onItemSelect={handleGenreSelect}
          selectedGenre={selectedGenre}
        />
      </div>

      <div className="col m-2">
        {user && (
          <Link to="/register/new" className="btn btn-primary mb-3">
            New Movie
          </Link>
        )}

        <p>Showing {filteredMovies.length} movies in the database.</p>

        <SearchBox onChange={handleSearch} value={searchQuery} />

        <MoviesTable
          items={paginatedMovies}
          onLike={handleLikeButtonClick}
          onDelete={handleDelete}
          OnSort={handleOnSort}
          sortColumn={sortColumn}
        />
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemsCount={filteredMovies.length}
          onPageChange={handleOnPageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
