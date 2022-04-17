import React from "react";
import classNames from "classnames/bind";
import Button from "@components/Button";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

// interface Props {}

const EqualSign: React.FC = () => (
  <div>
    <Button color='blue' buttonValue='='>
      =
    </Button>
  </div>
);

export default EqualSign;
