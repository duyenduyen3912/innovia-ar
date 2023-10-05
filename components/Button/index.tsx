import React from "react";
import { Button } from "antd"; 
import classNames from "classnames/bind";
import style from "./Button.module.scss";

const cx = classNames.bind(style);
export default function ButtonCustom(props) {
  return (
    <>
      <Button className={cx("order-btn")} htmlType={props.htmlType}>{props.name}</Button>
    </>
  );
}
