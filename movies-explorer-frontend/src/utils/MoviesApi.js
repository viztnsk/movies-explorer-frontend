import Api from "./Api";
import { BASE_MOVIES_API_URL } from "./constants";
class MoviesApi extends Api{
  constructor() {
    super({
      baseUrl: BASE_MOVIES_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  getMovies() {
    return this._fetch('/beatfilm-movies', 'GET')
  }
}

export const moviesApi = new MoviesApi()