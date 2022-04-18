import React from "react";
import classNames from "classnames/bind";
import Button from "@components/Button";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

// interface Props {}

const NumbersBlock: React.FC = () => (
  <div className={cnb("blocksPadding", "wrapper")}>
    {[...Array(9)].map((_, i) => (
      <Button color='white' buttonValue={9 - i}>
        {9 - i}
      </Button>
    ))}
    <Button color='white' buttonValue={0} className={cnb("zero")}>
      0
    </Button>
    <Button color='white' buttonValue='dot' className={cnb("dot")}>
      ,
    </Button>
  </div>
);

export default NumbersBlock;
