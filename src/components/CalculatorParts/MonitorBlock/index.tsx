import classNames from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

interface Props {
  value: string;
}

const MonitorBlock: React.FC<Props> = ({ value }) => (
  <div className={cnb("blocksPadding")}>
    <input className={cnb("input")} value={value} type='number' disabled />
  </div>
);

export default MonitorBlock;
