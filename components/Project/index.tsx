import React from 'react'
import Style from "./Project.module.scss"
import classNames from 'classnames/bind'
import { Image } from 'antd'

const cx = classNames.bind(Style)
export default function Project(prop) {
  return (
    <div className={cx("project")}>
        <Image src={require(`../../assets/imgs/${prop.src}.png`).default.src} className={cx("img")} />
    </div>
  )
}
