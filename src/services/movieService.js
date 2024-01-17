import http from "./httpService";

const apiEndPoint = "/movies";

export function getAllMovies() {
  return http.get(apiEndPoint);
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    console.log(body);
    return http.put(`${apiEndPoint}/${movie._id}`, body);
  }

  return http.post(apiEndPoint, movie);
}

export function getMovie(id) {
  return http.get(`${apiEndPoint}/${id}`);
}

export function deleteMovie(id) {
  return http.delete(`${apiEndPoint}/${id}`);
}
