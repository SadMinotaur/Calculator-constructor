import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cnb = classNames.bind(styles);

enum BColor {
  white = "whiteColor",
  blue = "blueColor"
}

type OmitedButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, "type">;
interface Props extends OmitedButtonProps {
  color: keyof typeof BColor;
}

const Button: React.FC<Props> = ({ color, className, ...props }) => (
  <button {...props} type='button' className={cnb("base", BColor[color], className)} />
);

export default Button;
