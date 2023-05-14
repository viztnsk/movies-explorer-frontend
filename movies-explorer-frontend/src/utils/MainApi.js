import Api from "./Api";
import { BASE_API_URL } from "./constants";
class MainApi extends Api{
  constructor() {
    super({
      baseUrl: 'http://localhost:3000',//`${BASE_API_URL}`,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const token = localStorage.getItem('token')
    if (token) {
      if (!this._options.headers) this._options.headers = {};
      this._options.headers.authorization = 'Bearer ' + token
    }
  }
  setToken(token) {
    localStorage.setItem('token', token)
    if (!this._options.headers) this._options.headers = {}
    this._options.headers.authorization = 'Bearer ' + token;
  }
  removeToken() {
    localStorage.removeItem('token')
    if (this._options?.headers?.authorization) {
      delete this._options?.headers?.authorization
    }
  }
  getMovies() {
    return this._fetch('/movies', 'GET')
  }
  saveMovie(data) {
    return this._fetch('/movies', "POST", data)
  }
  deleteMovie(id) {
    return this._fetch('/movies/' + id, 'DELETE')
  }
  getUser() {
    return this._fetch('/users/me', 'GET')
  }
  patchUser(data) {
    return this._fetch('/users/me', 'PATCH', data)
  }
}

export const mainApi = new MainApi({})