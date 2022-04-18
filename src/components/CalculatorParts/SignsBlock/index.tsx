import React from "react";
import classNames from "classnames/bind";
import Button from "@components/Button";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

// interface Props {}

const SignsBlock: React.FC = () => (
  <div className={cnb("blocksPadding", "wrapper")}>
    <Button color='white' buttonValue='/'>
      /
    </Button>
    <Button color='white' buttonValue='x'>
      x
    </Button>
    <Button color='white' buttonValue='-'>
      -
    </Button>
    <Button color='white' buttonValue='+'>
      +
    </Button>
  </div>
);

export default SignsBlock;
