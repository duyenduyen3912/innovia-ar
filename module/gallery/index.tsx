
import React from 'react'
import PageTitle from '../../components/PageTitle'
import Head from 'next/head'
import MenuType from '../../components/Menu'
import image from '../../constant/img/image'
import { Col, Row, Tabs, TabsProps } from 'antd'
import classNames from 'classnames/bind'
import style from "./Gallery.module.scss"
import GalleryCard from '../../components/GalleryCard'

const cx = classNames.bind(style)
const items: TabsProps['items'] = [
  {
    key: '1',
    label: <span className={cx("tab-header")}>Phòng Khách</span>,
    children: 
    <Row gutter={20} style={{margin: "30px 0"}} >
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="livingroom" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-living-2" author="2020, Trương Minh Lệ" name="Phòng Khách trang trí tối giản"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-living-3" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu hiện đại"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-living" author="2020, Trương Minh Lệ" name="Phòng Khách trang trí trang nhã"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="l1" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="l2" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="l3" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="l4" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="l5" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
    </Row>,
  },
  {
    key: '2',
    label: <span className={cx("tab-header")}>Phòng Ngủ</span>,
    children: 
    <Row gutter={20} style={{margin: "30px 0"}} >
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="s7" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-sleeping" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-sleeping-2" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="s1" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="s2" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="s3" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="s4" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="s5" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="s6" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      
    </Row>,
  },
  {
    key: '3',
    label: <span className={cx("tab-header")}>Phòng Ăn</span>,
    children: 
    <Row gutter={20} style={{margin: "30px 0"}} >
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="k7" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-kitchen" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-kitchen-2" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="k1" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="k2" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="k3" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="k4" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="k5" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="k6" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
    </Row>,
  },
  {
    key: '4',
    label: <span className={cx("tab-header")}>Văn Phòng</span>,
    children: 
    <Row gutter={20} style={{margin: "30px 0"}} >
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o1" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o2" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o3" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o4" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o5" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o6" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o7" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="p-office" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="o8" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
    </Row>,
  },
  {
    key: '5',
    label: <span className={cx("tab-header")}>Trang trí góc</span>,
    children: 
    <Row gutter={20} style={{margin: "30px 0"}} >
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d1" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d2" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d3" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d4" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d5" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d6" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d8" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d9" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
      <Col className={cx("gallery-item")} span={8}>
          <GalleryCard img="d10" author="2020, Trương Minh Lệ" name="Phòng Khách kiểu Bắc Âu"/>
      </Col>
    </Row>,
  },
];
export default function Menu() {
  return (
    <>
    <Head>
        <title>Thiết kế</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
    </Head>
    <div >
        <PageTitle name= {"Thiết kế"} />
        <div className={cx("design")}>
            <Tabs defaultActiveKey="1" items={items} className={cx("tabs")} />
        </div>
        
    </div>
    </>
    
  )
}
