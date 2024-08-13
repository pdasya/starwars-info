import { FC } from "react";
import style from "./controlled-form-component.module.css";
import Input from "../../components/input/input";
import Select from "../select/select";

const ControlledFormComponent: FC = () => {
  return (
    <form className={style.controlledFormWrapper}>
      <Input
        label="Name"
        id="name"
        validation={{
          required: "Name is required",
          pattern: {
            value: /^[A-Z]/,
            message: "First letter must be uppercase",
          },
        }}
      />
      <Input
        label="Age"
        id="age"
        type="number"
        validation={{
          required: "Age is required",
          min: { value: 0, message: "Age must be non-negative" },
        }}
      />

      <Input
        label="Email"
        id="email"
        type="email"
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Invalid email address",
          },
        }}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        validation={{
          required: "Password is required",
          validate:
            "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
        }}
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        validation={{
          required: "Name is required",
          pattern: {
            value: /^[A-Z]/,
            message: "First letter must be uppercase",
          },
        }}
      />

      <Select
        label="Gender"
        id="gender"
        options={["Male", "Female", "Other"]}
      ></Select>

      <div className={style.checkboxWrapper}>
        <input id="termsAccepted" type="checkbox" />
        <label htmlFor="termsAccepted">Accept Terms and Conditions</label>
      </div>

      <div className={style.pictureWrapper}>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" />
      </div>

      <Select
        label="Country"
        id="country"
        options={["USA", "Germany", "France"]}
      ></Select>

      <button type="submit" className={style.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default ControlledFormComponent;
