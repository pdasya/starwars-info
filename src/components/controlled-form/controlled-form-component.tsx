import { FC } from "react";
import style from "./controlled-form-component.module.css";
import Input from "./components/input/input";
import validationSchema from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AutocompleteSelect from "./components/auto-complete/auto-complete";
import { useDispatch } from "react-redux";
import { saveControlledFormData } from "../../features/controlledFormSlice";
import { useNavigate } from "react-router-dom";
import Select from "./components/select/select";

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

const ControlledFormComponent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const onSubmit = (data: FormData) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const formDataWithImage = {
        ...data,
        picture: base64String,
      };
      dispatch(saveControlledFormData(formDataWithImage));
      navigate("/");
    };

    if (data.picture[0]) {
      reader.readAsDataURL(data.picture[0]);
    }
  };

  const currentCountry = watch("country");

  return (
    <form
      className={style.controlledFormWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input label="Name" id="name" register={register} error={errors.name} />
      <Input
        label="Age"
        id="age"
        type="number"
        register={register}
        error={errors.age}
      />

      <Input
        label="Email"
        id="email"
        type="email"
        register={register}
        error={errors.email}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        register={register}
        error={errors.password}
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
      />

      <Select
        label="Gender"
        id="gender"
        options={["male", "female", "other"]}
        register={register}
        error={errors.gender}
      />

      <div className={style.checkboxWrapper}>
        <div className={style.checkboxContent}>
          <input
            id="termsAccepted"
            type="checkbox"
            {...register("termsAccepted")}
          />
          <label htmlFor="termsAccepted">Accept Terms and Conditions</label>
        </div>
        {errors.termsAccepted && (
          <span className={style.errorMessage}>
            {errors.termsAccepted.message}
          </span>
        )}
      </div>

      <div className={style.pictureWrapper}>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" {...register("picture")} />
        {errors.picture && (
          <span className={style.errorMessage}>{errors.picture.message}</span>
        )}
      </div>

      <div className={style.autoCompleteWrapper}>
        <AutocompleteSelect
          id="country"
          label="Country"
          value={currentCountry || ""}
          onChange={(value: string) => setValue("country", value)}
          register={register}
        />
        {errors.country && (
          <span className={style.errorMessage}>{errors.country.message}</span>
        )}
      </div>

      <button
        type="submit"
        className={style.submitButton}
        disabled={isSubmitted && !isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default ControlledFormComponent;
