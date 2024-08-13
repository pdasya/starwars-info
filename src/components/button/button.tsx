import { FC } from "react";
import style from "./button.module.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  formName: string;
  to: string;
}

const Button: FC<ButtonProps> = ({ formName, to }) => {
  return (
    <Link to={to}>
      <button className={style.button}>{formName}</button>
    </Link>
  );
};

export default Button;
