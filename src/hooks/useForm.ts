import { ChangeEvent, useState } from "react";
import { TInputValues } from "../utils/types";

export function useForm(inputValues: TInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
