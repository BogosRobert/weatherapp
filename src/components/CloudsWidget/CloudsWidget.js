import React from "react";
import css from "./CloudsWidget.module.css";

const CloudsWidget = () => {
  return (
    <div className={css.container}>
      <div className={`${css.cloud} ${css.front}`}>
        <span className={css.leftFront}></span>
        <span className={css.rightFront}></span>
      </div>
      <span className={`${css.sun} ${css.sunshine}`}></span>
      <span className={css.sun}></span>
      <div className={`${css.cloud} ${css.back}`}>
        <span className={css.leftBack}></span>
        <span className={css.rightBack}></span>
      </div>
    </div>
  );
};

export default CloudsWidget;
