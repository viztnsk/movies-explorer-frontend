import { useContext } from "react";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useControlledInputs from "../../hooks/useForm";
import {
  name_validation,
  email_validation,
} from '../../utils/formValidation/inputValidations'
import { FormInput } from "../FormInput/FormInput";
import Header from "../Header/Header";

function Profile({ name, email, ...props }) {
  const currentUser = useContext(CurrentUserContext)
  const [edit, setEdit] = useState(false)
  const [isInputDisabled, setInputDisabled] = useState(true);

  const [ values, setValues//handleChange
   ] = useState({//useControlledInputs({
    name: currentUser.name || '',
    email: currentUser.email || ''
  })
  const navigate = useNavigate();
  const onEdit = () => {
    setEdit(!edit)
    setInputDisabled(!isInputDisabled)
  }
  const errorMessage = 'При обновлении профиля произошла ошибка.'

  const handleChange = (event) => {
		const { name, value } = event.target;
		setValues((prevValue) => ({
			...prevValue,
			[name]: value,
		}));
	};

  const methods = useForm(
    { mode: 'onChange' }
    )
  const formValues = methods.getValues()

    // useEffect(() => {
    //   //if ()

    //   console.log(methods.formState.isValid)
    //   console.log(formValues)
    //   console.log(methods.formState.errors)
    //   console.log(updatedFormValues)
    //   console.log(!((updatedFormValues.name !== currentUser.name) || (updatedFormValues.email !== currentUser.email)))
    // }, [formValues.name, formValues.email])


  const updatedFormValues = {
    name: formValues.name === undefined ? values.name : formValues.name ,
    email: formValues.email === undefined ? values.email : formValues.email
  }

  const onSubmit = () => {
    const {name, email} = values;
  if (name !== currentUser.name || email !== currentUser.email) {
    props.updateUser(values)
    onEdit()    
  } else return 
}

  function signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('movieQuery')
    localStorage.removeItem('foundMovies')
    localStorage.removeItem('checkboxState')
    props.setChecked(false)
    props.setSearchedMovies([])
    navigate('/signin', {replace: true})
    props.setLoggedIn(false)
  } 

  return (
    <>
    <Header loggedIn={props.loggedIn}/>
    <section className="profile">
     <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
     <FormProvider {...methods}>
     <form className="profile__form" onSubmit={methods.handleSubmit(onSubmit)}>
      <FormInput 
        onChange={handleChange} 
        {...name_validation} 
        label={'Имя'}
        labelClassName={"profile__label"} 
        inputClassName={"profile__input"}
        // errorClassName={"profile__input-error"} 
        disabled={isInputDisabled}
        defaultValue={values.name}
        //value={values.name}
        />
      <FormInput 
        onChange={handleChange} 
        {...email_validation}
        labelClassName={"profile__label"} 
        inputClassName={"profile__input"} 
        // errorClassName={"profile__input-error"} 
        disabled={isInputDisabled}
        defaultValue={values.email}
        //value={values.email}
        />
        <div className={`profile__edit ${edit ? 'profile_shown' : ''}`}>
          {props.error && <span className='profile__error'>{errorMessage}</span>}
          <button type='submit' className={`profile__save-button`} onClick={methods.handleSubmit(onSubmit)} disabled={!methods.formState.isValid}>
            {props.success ? 'Данные обновлены' : 'Сохранить'}
          </button>
        </div>
      <button className={`profile__edit-button ${edit ? 'profile_hidden' : ''}`} type='button' onClick={onEdit}>Редактировать</button>
      <button type='button' to="/" onClick={signOut} className={`profile__exit ${edit ? 'profile_hidden' : ''}`}>Выйти из аккаунта</button>
     </form>
     </FormProvider>
     {/* <button type='button' to="/" onClick={signOut} className={`profile__exit ${edit ? 'profile_hidden' : ''}`}>Выйти из аккаунта</button>
     <div className={`profile__edit ${edit ? 'profile_shown' : ''}`}>
      {props.error && <span className='profile__error'
      >{errorMessage}
      </span>}
      <button type='submit' className={`profile__save-button`} onClick={methods.handleSubmit(onSubmit)} disabled={!methods.formState.isValid}
      >{props.success ? 'Данные обновлены' : 'Сохранить'}</button>
      </div> */}
    </section>
    </>
  )
}
// disabled={!((updatedFormValues.name !== currentUser.name) || (updatedFormValues.email !== currentUser.email))}

export default Profile;