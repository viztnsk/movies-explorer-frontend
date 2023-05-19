import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import * as auth from '../../utils/Auth';
import { FormInput } from "../FormInput/FormInput";
import {
  name_validation,
  email_validation,
  password_validation,
} from '../../utils/formValidation/inputValidations'
import useControlledInputs from "../../hooks/useForm";
import AuthHeader from "../AuthHeader/AuthHeader";
import { mainApi } from "../../utils/MainApi";

function Register(props) { 
  const { values, handleChange } = useControlledInputs({
    name: '',
    email: '',
    password: ''
  });

  const methods = useForm(
    { mode: "onChange" }
    );

  function handleSignIn(values) {
    return auth.authorize(values.email, values.password)
    .then((res) => {
      mainApi.setToken(res.token)
      props.checkToken()
    })
  }

  const onSubmit = methods.handleSubmit((values) => {
    props.setDisabled(true)
     const { name, email, password } = values
     auth.register(name, email, password)
    .then((res) => {
      if (res) {
        props.setStatus(true)
        props.handleInfoPopup()
      }})
      .then(() => {
        handleSignIn(values)
        props.setDisabled(false)
    })
    .catch((err) => {
      console.log(err)
      props.setStatus(false)
      props.handleInfoPopup()
      props.setDisabled(false)
    })
  })

  return (
    <>
    <AuthHeader></AuthHeader>
    <section className="auth">
    <FormProvider {...methods}>
     <form 
      onSubmit={onSubmit}
      className="auth__form" 
      noValidate
      >
        <FormInput 
          disabled={props.disabled}
          onChange={handleChange}
          {...name_validation}
          labelClassName={"auth__label"}
          inputClassName={"auth__input"}
          errorClassName={"auth__error"}/>
        <FormInput 
          disabled={props.disabled}
          onChange={handleChange} 
          {...email_validation}
          labelClassName={"auth__label"}
          inputClassName={"auth__input"}
          errorClassName={"auth__error"}/>
        <FormInput 
          disabled={props.disabled}
          onChange={handleChange} 
          {...password_validation} 
          labelClassName={"auth__label"} 
          inputClassName={"auth__input"} 
          errorClassName={"auth__error"}/>
        <button 
          className="auth__button" 
          type="submit" 
          disabled={props.disabled? props.disabled : !methods.formState.isValid}
          onClick={methods.handleSubmit(onSubmit)}>
            Зарегистрироваться
        </button>
        <div className="auth__info auth__info_type_reg">
          <p className="auth__text">Уже зарегистрированы?</p>
          <Link to={'/signin'} className='auth__link'>Войти</Link>
        </div>
      </form>
     </FormProvider>
    </section>
    </>
  )
}

export default Register;