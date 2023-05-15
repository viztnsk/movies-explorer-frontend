export default class Api {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }
  async _fetch(path, method="GET", body) {
    const opt = { ...this._options, method };
    if (body) {
      if (typeof body === 'string') {
        opt.body = body;
      } else {
        opt.body = JSON.stringify(body);
      }
    }
    const res = await fetch(this._baseUrl + path, opt)
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${JSON.message}`)
    }
  }
}