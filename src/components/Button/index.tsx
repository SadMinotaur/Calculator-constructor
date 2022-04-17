import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cnb = classNames.bind(styles);

enum BColor {
  white = "whiteColor",
  blue = "blueColor"
}

type OmitedButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, "type" | "onClick">;
export interface ButtonProps<T> extends OmitedButtonProps {
  color: keyof typeof BColor;
  buttonValue: T;
  onClick?: (val: T) => void;
}

const Button = <T,>({
  color,
  buttonValue,
  className,
  onClick,
  ...props
}: React.PropsWithChildren<ButtonProps<T>>): React.ReactElement => (
  <button
    {...props}
    type='button'
    onClick={() => onClick?.(buttonValue)}
    className={cnb("base", BColor[color], className)}
  />
);

export default Button;
