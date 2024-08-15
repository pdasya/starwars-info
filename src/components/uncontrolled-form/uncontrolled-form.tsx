import { FC, useRef } from "react";
import Input from "./components/input/input";
import Select from "./components/select/select";
import { useDispatch } from "react-redux";
import { saveUncontrolledFormData } from "../../features/uncontrolledFormSlice";
import { useNavigate } from "react-router-dom";
import AutocompleteSelect from "./components/auto-complete/auto-complete";
import style from "./uncontrolled-form.module.css";

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

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsAcceptedRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <form className={style.controlledFormWrapper} onSubmit={onSubmit}>
      <div className={style.inputWrapper}>
        <Input label="Name" id="name" ref={nameRef} />
      </div>

      <div className={style.inputWrapper}>
        <Input label="Age" id="age" type="number" ref={ageRef} />
      </div>

      <div className={style.inputWrapper}>
        <Input label="Email" id="email" type="email" ref={emailRef} />
      </div>

      <div className={style.inputWrapper}>
        <Input
          label="Password"
          id="password"
          type="password"
          ref={passwordRef}
        />
      </div>

      <div className={style.inputWrapper}>
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
        />
      </div>

      <div className={style.inputWrapper}>
        <Select
          label="Gender"
          id="gender"
          options={["male", "female", "other"]}
          ref={genderRef}
        />
      </div>

      <div className={style.checkboxWrapper}>
        <div className={style.checkboxContent}>
          <input id="termsAccepted" type="checkbox" ref={termsAcceptedRef} />
          <label htmlFor="termsAccepted">Accept Terms and Conditions</label>
        </div>
      </div>

      <div className={style.pictureWrapper}>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" ref={pictureRef} />
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
      </div>

      <button type="submit" className={style.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledFormComponent;
