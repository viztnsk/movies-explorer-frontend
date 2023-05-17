import { useFormContext } from 'react-hook-form'
import { findInputError } from '../../utils/formValidation/findInputError'
import { isFormInvalid } from '../../utils/formValidation/isFormInvalid'

export const FormInputError = ({ 
  message, 
  isInvalid, className 
}) => {
  return (
    <span className={`${className} ${isInvalid ? `${className}_shown` : ''}`}> {message}
    </span>
  )
}

export const FormInput = ({ 
  name, label, type, id, placeholder, validation, onChange, inputClassName, labelClassName, errorClassName, disabled, defaultValue, 
}) => {
  const methods = useFormContext()
  const inputError = findInputError(methods.formState.errors, name)
  const isInvalid = isFormInvalid(inputError)
  return (
    <label 
        className={labelClassName}
          htmlFor={id}>
            {label}
        <input 
          type={type} 
          id={id} 
          name={name}
          className={inputClassName}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
          {...methods.register(name, validation)}
        />
        {isInvalid && errorClassName && defaultValue !== '' && 
        (<FormInputError 
        className={errorClassName}
          isInvalid={isInvalid}
          message={inputError?.error?.message}
          key={inputError?.error?.message}/>)}
      </label>
  )
}