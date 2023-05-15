export const name_validation = {
  name: 'name',
  label: 'Имя',
  type: 'text',
  id: 'name',
  placeholder: 'Ваше имя',
  validation: {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    minLength: {
      value: 2,
      message: 'Минимальное количество знаков – 2',
    },
    maxLength: {
      value: 30,
      message: 'Максимальное количество знаков - 30',
    },
    pattern: {
      value: /^[a-яё]+(?:[ -][a-яё]+)*$/i,
      message: 'Может содержать только кириллицу, латиницу, дефис и пробел'
    }
  },
}

export const password_validation = {
  name: 'password',
  label: 'Пароль',
  type: 'password',
  id: 'password',
  placeholder: 'Ваш пароль',
  validation: {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    minLength: {
      value: 8,
      message: 'Минимальное количество знаков – 8',
    },
  },
}

export const email_validation = {
  name: 'email',
  label: 'E-mail',
  type: 'email',
  id: 'email',
  placeholder: 'pochta@yandex.ru',
  validation: {
    required: {
      value: true,
      message: 'Обязательное поле',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Не соответствует e-mail адресу',
    },
  },
}