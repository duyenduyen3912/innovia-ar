import React, { useEffect, useState } from 'react'
import 'animate.css'
import classNames from 'classnames/bind'
import style from "./Menu.module.scss"
import { Col, Row } from 'antd'
import Image from 'next/image'
import { DollarOutlined } from '@ant-design/icons'
import { useInView } from 'react-intersection-observer'
import { Inter } from 'next/font/google'

const cx = classNames.bind(style)
export default function MenuType(props) {
   
     const [isVisible, setIsVisible] = useState(false);
         const [ref, inView] = useInView({
             triggerOnce: false, // Kích hoạt animation một lần duy nhất
             threshold: 0.1, // Khi phần tử nằm trong 10% tầm nhìn
         });
        
       useEffect(() => {
         if (inView) {
           setIsVisible(true);
         }
       }, [inView]);
  return (
    <div className={cx("menu")} style={{backgroundImage: `url('${props.bg.default.src}')`}}>
        <div className={cx("menu-type")}>
            <div className={cx("type")}>
                {props.menuType}
            </div>
            <div className={cx("menu-text")}>
                MENU
            </div>
        </div>
        <Row  >
            <MenuItem img="juice-2" name="Peach milk tea"  price="12" description="Special drinks for happy days"/>
            <MenuItem img="juice-2" name="Peach milk tea"  price="12" description="Special drinks for happy days"/>
            <MenuItem img="juice-2" name="Peach milk tea" price="12" description="Special drinks for happy days"/>
            <MenuItem img="juice-2" name="Peach milk tea" price="12" description="Special drinks for happy days"/>
            <MenuItem img="food-2" name="Tokbokki" price="35" description="Korean food flavor"/>
            <MenuItem img="food-2" name="Tokbokki" price="35" description="Korean food flavor"/>
            <MenuItem img="food-2" name="Tokbokki" price="35" description="Korean food flavor"/>
            <MenuItem img="food-2" name="Tokbokki" price="35" description="Korean food flavor"/>
        </Row>
     
                
      
           
      
    </div>
  )
}

const MenuItem = (props) => {
    return (
      
            <Col span={12}  className={cx("menu-item")} xs={24} sm={24} md={24} lg={24} xl={12}>
                <Row gutter={16} className={cx("item-row")} justify="center">
                <Col   span={4} xs={24} sm={24} md = {24} lg={4} style={{textAlign: 'center'}}>
                    <div className={cx("item-image-wrap")} >
                        <Image src={require(`../../assets/imgs/${props.img}.png`)} alt="juice-menu" className={cx("item-image")}/>
                    </div>
                </Col>
                <Col span={20} xs={24} sm={24} md={24} lg={20}>
                    <div className={cx("item-detail")}>
                        <div className={cx("item-name")}>
                            <span className={cx("name")}> {props.name}</span>
                            <span className={cx("line")}></span>
                            <span className={cx("price-wrap")}>
                                <DollarOutlined style={{ fontSize: '20px', color: '#fff', fontWeight: '500' }}/>
                                <span className={cx("price")}>{props.price}</span>
                            </span>
                        </div>
                        <div className={cx("item-description")}>
                            {props.description}
                        </div>
                    </div>
                </Col>
                </Row>
                
            </Col>

    )
}
