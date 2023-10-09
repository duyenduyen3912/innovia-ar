import React from 'react'
import style from './Card.module.scss'
import { Image } from 'antd'
import classNames from 'classnames/bind'


const cx = classNames.bind(style)
export default function Card(props) {
  return (
    <div className={cx("card")}>
        <div className={cx("img-wrap")}>
            <Image src={require(`../../assets/imgs/${props.src}.png`).default.src} className={cx("offer-image")} preview={false}/>
        </div>
        <div className={cx("offer-name")}>{props.name}</div>
    </div>
  )
}
