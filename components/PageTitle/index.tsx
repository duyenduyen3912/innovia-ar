import React from 'react'
import classNames from 'classnames/bind'
import style from "./PageTitle.module.scss"
import {Image} from 'antd'


const cx = classNames.bind(style)
export default function PageTitle(prop) {
  return (
    <div className={cx("page-title")}>
        <Image src={require("../../assets/imgs/title-bg.png").default.src} alt="title-background" className={cx("image")} preview={false}/>
        <div className={cx("title")}>
            {prop.name}
        </div>
    </div>
  )
}
