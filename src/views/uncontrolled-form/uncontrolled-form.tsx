import { FC } from "react";
import Button from "../../components/button/button";
import style from "./uncontrolled-form.module.css";
import UncontrolledFormComponent from "../../components/uncontrolled-form/uncontrolled-form";

const UncontrolledForm: FC = () => {
  return (
    <>
      <Button
        formName="Back to Main Page"
        to="/main"
        className={style.backToMainButton}
      ></Button>
      <h3 className={style.controlledHeader}>uncontrolled Form Page</h3>
      <UncontrolledFormComponent />
    </>
  );
};

export default UncontrolledForm;
