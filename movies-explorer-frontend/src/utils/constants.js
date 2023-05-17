const DEVICE_WIDTH = {
  DESKTOP: 1160,
  TABLET: 768,
  MOBILE: 320
}

const ERRORS = {
  LOGIN: {
    400: "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
    403: "При авторизации произошла ошибка. Переданный токен некорректен." ,
    404: "Вы ввели неправильный логин или пароль." ,
  },
  REGISTRATION: {
    400: 'При регистрации пользователя произошла ошибка.',
    409: "Пользователь с таким email уже существует.",
  },
  PROFILE: {
    400: 'При обновлении профиля произошла ошибка.',
    409: "Пользователь с таким email уже существует.",
  }
}

const MOVIE_COUNT = {
  DESKTOP: 12,
  TABLET: 8,
  MOBILE: 5
}
const MORE_MOVIE_COUNT = {
  DESKTOP: 3,
  TABLET: 2,
  MOBILE: 2
}

const SHORT_MOVIE_LENGTH = 40

const BASE_API_URL = 'https://api.viztnsk.movies.nomoredomains.monster'
const BASE_MOVIES_API_URL = 'https://api.nomoreparties.co'

export { DEVICE_WIDTH, ERRORS, MOVIE_COUNT, MORE_MOVIE_COUNT, SHORT_MOVIE_LENGTH, BASE_API_URL, BASE_MOVIES_API_URL }