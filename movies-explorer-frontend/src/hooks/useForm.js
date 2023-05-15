import { useState, useCallback } from 'react';

function useControlledInputs(inputValues) {
  const [values, setValues] = useState(inputValues);
  const handleChange = useCallback((event) => {
    const {value, name} = event.target;
    setValues(prevState => ({ ...prevState, [name]: value }));
  }, [setValues]);

  return {
    values, setValues, handleChange};
}
export default useControlledInputs;