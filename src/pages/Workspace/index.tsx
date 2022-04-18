import React from "react";
import { DndContext } from "@dnd-kit/core";
import Button from "@components/Button";
import StateSwitch from "@components/StateSwitch";
import EqualSign from "@components/CalculatorParts/EqualBlock";
import SignsBlock from "@components/CalculatorParts/SignsBlock";
import NumbersBlock from "@components/CalculatorParts/NumbersBlock";
import MonitorBlock from "@components/CalculatorParts/MonitorBlock";
// import { Draggable } from "./Draggable";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import ImageSvg from "@src/svgr/image";

const cnb = classNames.bind(styles);

const Workspace: React.FC = () => {
  return (
    <div className={cnb("container")}>
      <div className={cnb("elements")}>
        <div className={cnb("box")}>
          <MonitorBlock value='0' />
          <SignsBlock />
          <NumbersBlock />
          <EqualSign />
        </div>
      </div>
      <div className={cnb("controls")}>
        <StateSwitch active='constructor' />
      </div>
      <div className={cnb("dropArea")}>
        <div className={cnb("area")}>
          <div className={cnb("desc")}>
            <ImageSvg />
            <h6>Перетащите сюда</h6>
            <p>
              любой элемент
              <br /> из левой панели
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
