import React from "react";
import styles from "./Button.module.scss";

enum BColor {
  white = "whiteColor",
  blue = "blueColor"
}

type OmitedButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, "type">;
interface Props extends OmitedButtonProps {
  color: keyof typeof BColor;
}

const Button: React.FC<Props> = ({ color, className, ...props }) => (
  <button
    {...props}
    type='button'
    className={`${styles.base} ${styles[BColor[color]]} ${className}`}
  />
);

export default Button;
