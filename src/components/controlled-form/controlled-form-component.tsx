import { FC } from "react";
import style from "./controlled-form-component.module.css";
import Input from "../../components/input/input";
import Select from "../select/select";
import validationSchema from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AutocompleteSelect from "../auto-complete/auto-complete";

const ControlledFormComponent: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
        options={["Male", "Female", "Other"]}
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

      <button type="submit" className={style.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default ControlledFormComponent;
