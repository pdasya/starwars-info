import { FC } from "react";
import Button from "../../components/button/button";
import style from "./main-page.module.css";

const Main: FC = () => {
  return (
    <div className={style.buttonWrapper}>
      <Button formName="Controlled Form" to="/controlled-form"></Button>
      <Button formName="Uncontrolled Form" to="/uncontrolled-form"></Button>
    </div>
  );
};

export default Main;
