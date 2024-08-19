import { FC, useRef, useState } from "react";
import Input from "./components/input/input";
import Select from "./components/select/select";
import { useDispatch } from "react-redux";
import { saveUncontrolledFormData } from "../../features/uncontrolledFormSlice";
import { useNavigate } from "react-router-dom";
import AutocompleteSelect from "./components/auto-complete/auto-complete";
import style from "./uncontrolled-form.module.css";
import validationSchema from "../../utils/validationSchema";
import * as Yup from "yup";

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  picture: FileList;
  country: string;
}

const UncontrolledFormComponent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {},
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsAcceptedRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: FormData = {
      name: nameRef.current?.value || "",
      age: parseInt(ageRef.current?.value || "0"),
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
      gender: genderRef.current?.value || "",
      termsAccepted: termsAcceptedRef.current?.checked || false,
      picture: pictureRef.current?.files || new FileList(),
      country: countryRef.current?.value || "",
    };

    try {
      await validationSchema.validate(data, { abortEarly: false });

      if (data.picture[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const formDataWithImage = {
            ...data,
            picture: base64String,
          };
          dispatch(saveUncontrolledFormData(formDataWithImage));
          navigate("/");
        };
        reader.readAsDataURL(data.picture[0]);
      } else {
        const formDataWithoutImage = {
          ...data,
          picture: "",
        };
        dispatch(saveUncontrolledFormData(formDataWithoutImage));
        navigate("/");
      }
    } catch (validationErrors) {
      const formattedErrors: Record<string, string> = {};

      if (validationErrors instanceof Yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path && error.message) {
            formattedErrors[error.path] = error.message;
          }
        });
      }
      setErrors(formattedErrors);
    }
  };

  return (
    <form className={style.controlledFormWrapper} onSubmit={onSubmit}>
      <div className={style.inputWrapper}>
        <Input label="Name" id="name" ref={nameRef} />
        {errors.name && (
          <span className={style.errorMessage}>{errors.name}</span>
        )}
      </div>

      <div className={style.inputWrapper}>
        <Input label="Age" id="age" type="number" ref={ageRef} />
        {errors.age && <span className={style.errorMessage}>{errors.age}</span>}
      </div>

      <div className={style.inputWrapper}>
        <Input label="Email" id="email" type="email" ref={emailRef} />
        {errors.email && (
          <span className={style.errorMessage}>{errors.email}</span>
        )}
      </div>

      <div className={style.inputWrapper}>
        <Input
          label="Password"
          id="password"
          type="password"
          ref={passwordRef}
        />
        {errors.password && (
          <span className={style.errorMessage}>{errors.password}</span>
        )}
      </div>

      <div className={style.inputWrapper}>
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
        />
        {errors.confirmPassword && (
          <span className={style.errorMessage}>{errors.confirmPassword}</span>
        )}
      </div>

      <div className={style.inputWrapper}>
        <Select
          label="Gender"
          id="gender"
          options={["male", "female", "other"]}
          ref={genderRef}
        />
        {errors.gender && (
          <span className={style.errorMessage}>{errors.gender}</span>
        )}
      </div>

      <div className={style.checkboxWrapper}>
        <div className={style.checkboxContent}>
          <input id="termsAccepted" type="checkbox" ref={termsAcceptedRef} />
          <label htmlFor="termsAccepted">Accept Terms and Conditions</label>
        </div>
        {errors.termsAccepted && (
          <span className={style.errorMessage}>{errors.termsAccepted}</span>
        )}
      </div>

      <div className={style.pictureWrapper}>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" ref={pictureRef} />
        {errors.picture && (
          <span className={style.errorMessage}>{errors.picture}</span>
        )}
      </div>

      <div className={style.autoCompleteWrapper}>
        <AutocompleteSelect
          id="country"
          label="Country"
          onChange={(value: string) => {
            if (countryRef.current) {
              countryRef.current.value = value;
            }
          }}
          ref={countryRef}
        />
        {errors.country && (
          <span className={style.errorMessage}>{errors.country}</span>
        )}
      </div>

      <button type="submit" className={style.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledFormComponent;
