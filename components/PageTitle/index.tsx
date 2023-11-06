import React from 'react'
import classNames from 'classnames/bind'
import style from "./PageTitle.module.scss"
import {Image} from 'antd'


const cx = classNames.bind(style)
export default function PageTitle(prop) {
  return (
    <div className={cx("page-title")}>
        <Image 
          src={prop.img} 
          alt="title-background" 
          className={cx("image")} 
          fallback={require("../../assets/imgs/page-bg.png").default.src}
          preview={false}
        />
        <div className={cx("overlay")}></div>
        <div className={cx("title")}>
            {prop.name}
        </div>
    </div>
  )
}
