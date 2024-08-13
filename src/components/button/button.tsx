import { FC } from "react";
import style from './button.module.css';

interface ButtonProps {
    formName: string;
}

const Button:FC<ButtonProps> = ({formName}) => {
    return (
        <button className={style.button}>{formName}</button>
    )
}

export default Button;