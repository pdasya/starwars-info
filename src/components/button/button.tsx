import { FC } from "react";
import style from "./button.module.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  formName: string;
  to: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ formName, to, className }) => {
  return (
    <Link to={to} className={className}>
      <button className={style.button}>{formName}</button>
    </Link>
  );
};

export default Button;
