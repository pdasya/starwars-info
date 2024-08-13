import { FC } from "react";
import ControlledFormComponent from "../../components/controlled-form/controlled-form-component";
import style from "./controlled-form.module.css";
import Button from "../../components/button/button";

const ControlledForm: FC = () => {
  return (
    <>
      <Button
        formName="Back to Main Page"
        to="/main"
        className={style.backToMainButton}
      ></Button>
      <h3 className={style.controlledHeader}>Controlled Form Page</h3>
      <ControlledFormComponent />
    </>
  );
};

export default ControlledForm;
