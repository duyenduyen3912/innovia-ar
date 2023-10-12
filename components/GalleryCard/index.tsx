import { Image } from 'antd'
import React from 'react'
import classNames from 'classnames/bind'
import style from "./GalleryCard.module.scss"

const cx= classNames.bind(style)
export default function GalleryCard(props) {
  return (
    <div className={cx("gallery")}>
        <Image src={require(`../../assets/imgs/${props.img}.png`).default.src} className={cx("img")}/>
        <div className={cx("name")}> {props.name} </div>
        <div className={cx("author")}>{props.author}</div>
    </div>
  )
}
