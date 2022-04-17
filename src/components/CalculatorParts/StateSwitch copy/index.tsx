import React from "react";
import classNames from "classnames/bind";
import EyeSvg from "@src/svgr/eye";
import SelectorSvg from "@src/svgr/selector";
import styles from "./StateSwitch.module.scss";

const cnb = classNames.bind(styles);

enum ActiveTab {
  runtime = "runtime",
  constructor = "constructor"
}
type Tab = keyof typeof ActiveTab;
interface Props {
  active?: Tab;
  onClick?: (tab: Tab) => void;
}

const StateSwitch: React.FC<Props> = ({ active, onClick }) => (
  <div className={cnb("calculatorWrapper")}>
    <div
      onClick={() => onClick?.("runtime")}
      className={cnb("item", { selected: active === "runtime" })}
    >
      <EyeSvg />
      <label className={cnb("text")}>Runtime</label>
    </div>
    <div
      onClick={() => onClick?.("constructor")}
      className={cnb("item", { selected: active === "constructor" })}
    >
      <SelectorSvg />
      <label className={cnb("text")}>Constructor</label>
    </div>
  </div>
);

export default StateSwitch;
