import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import useControlledInputs from "../../hooks/useForm";
import { FormInput } from "../FormInput/FormInput";
import {
  email_validation,
  password_validation,
} from '../../utils/formValidation/inputValidations'
import AuthHeader from "../AuthHeader/AuthHeader";

function Login(props) {
  const { values,  handleChange, } = useControlledInputs({
      email: '',
      password: ''
    })

  const methods = useForm(
    { mode: "onChange" }
  );  
  const onSubmit = methods.handleSubmit((values) => {
    props.onLogin(values)
  })

  return (
    <>
    <AuthHeader></AuthHeader>
    <section className="auth">
      <FormProvider {...methods}>
      <form 
        onSubmit={onSubmit}
        className="auth__form" 
        noValidate>
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
          onClick={onSubmit}>
            Войти
        </button>
        <div className="auth__info">
          <p className="auth__text">Ещё не зарегистрированы?</p>
          <Link to={'/signup'} className='auth__link'>Регистрация</Link>
        </div>
      </form>
      </FormProvider>
    </section>
    </>
  )
}

export default Login;