import React from "react";
import classNames from "classnames/bind";
import { ConstructorState } from "@store/columns/types";
import EyeSvg from "@src/svgr/eye";
import SelectorSvg from "@src/svgr/selector";
import styles from "./StateSwitch.module.scss";

const cnb = classNames.bind(styles);

interface Props {
  readonly active?: ConstructorState;
  readonly onClick?: (tab: ConstructorState) => void;
}

const StateSwitch: React.FC<Props> = ({ active, onClick }) => (
  <div className={cnb("calculatorWrapper")}>
    <div
      onClick={() => onClick?.(ConstructorState.runtime)}
      className={cnb("item", { selected: active === ConstructorState.runtime })}
    >
      <EyeSvg />
      <label className={cnb("text")}>Runtime</label>
    </div>
    <div
      onClick={() => onClick?.(ConstructorState.constructor)}
      className={cnb("item", { selected: active === ConstructorState.constructor })}
    >
      <SelectorSvg />
      <label className={cnb("text")}>Constructor</label>
    </div>
  </div>
);

export default StateSwitch;
