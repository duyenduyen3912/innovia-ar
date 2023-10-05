import React from "react";
import classNames from "classnames/bind";
import style from "./Footer.module.scss";
import { Col, Row } from "antd";
import { ClockCircleOutlined, FacebookOutlined, InstagramOutlined, PhoneOutlined, PushpinOutlined, TwitterSquareFilled, YoutubeOutlined } from "@ant-design/icons";
import Image from "next/image";

const cx = classNames.bind(style);
export default function Footer() {
  return (
    <div className={cx("footer")}>
      <Row justify="center" gutter={40} className={cx("footer-top")}>
        <Col  xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <div className={cx("restaurant")}>
              <div className={cx("restaurant-title")}>
                  {"Don't be shy, say HI!"}
              </div>
              <div className={cx("restaurant-infor-wrap")}>
                <div className={cx("restaurant-infor")}>
                <PhoneOutlined style={{fontSize: "17px", color: "#fff"}}/>
                <span className={cx("text")}>	
                    {"1-677-124-44227, 1-787-124-445207"}
                </span>
                </div>
                <div className={cx("restaurant-infor")}>
                  <ClockCircleOutlined style={{fontSize: "17px", color: "#fff"}}/>
                  <span className={cx("text")}>	
                  Mon - Sat 8.00 - 18.00 Sunday CLOSED
                  </span>
                </div>
                <div className={cx("restaurant-infor")}>
                  <PushpinOutlined style={{fontSize: "17px", color: "#fff"}}/>
                  <span className={cx("text")}>	
                  184 Main Collins Street West Victoria 8007
                  </span>
                </div>
                <div className={cx("restaurant-infor")}>
                    <Image src={require("../../assets/imgs/lemon-grass.png")} alt="lemon-grass" className={cx("infor-image")}/>
                </div>
              </div>
          </div>
          
        </Col>
        <Col  xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
        <div className={cx("open-hours")}>
              <div className={cx("restaurant-title")}>
                  Opening Hours
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Monday</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Tuesday</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Wednesday</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Thursday</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Friday</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Saturday</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Sunday</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 22: 00</span>
              </div>
          </div>
        </Col>
        <Col  xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <div className={cx("instagram")}>
              <div className={cx("restaurant-title")}>
                  Instagram
              </div>
              <Row className={cx("instagram-img")} gutter={6}>
                  <Col span={8} className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/instagram-watermelonjuice.png") } alt="smoothie" className={cx("img")}/>
                  </Col>
                  <Col span={8} className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/instagram-juice.png") } alt="smoothie" className={cx("img")}/>
                  </Col>
                  <Col span={8} className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/instagram-fruit.png") } alt="smoothie" className={cx("img")}/>
                  </Col>
                  <Col span={8} className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/instagram-pizza.png") } alt="smoothie" className={cx("img")}/>
                  </Col>
                  <Col span={8} className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/instagram-watermelon.png") } alt="smoothie" className={cx("img")}/>
                  </Col>
                  <Col span={8} className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/instagram-noodle.png") } alt="smoothie" className={cx("img")}/>
                  </Col>
              </Row>
          </div>
          

        </Col>
      </Row>
      <Row justify="center" gutter={40} className={cx("footer-bottom")}>
        <Col span={5}>
          <div className={cx("year")}>
             © 2018 Qode Interactive, All Rights Reserved
          </div>
         
        </Col>
        <Col span={5}>
          <div className={cx("social")}>
          <FacebookOutlined style={{fontSize: "19px", color:"#505050"}}/>
          <TwitterSquareFilled style={{fontSize: "19px", color:"#505050"}}/>
          <InstagramOutlined style={{fontSize: "19px", color:"#505050"}}/>
          <YoutubeOutlined style={{fontSize: "19px", color:"#505050"}}/>
          </div>
        </Col>
        <Col span={5}>
          <div className={cx("right")}>
            All Rights Reserved
          </div>
        </Col>
      </Row>
    </div>
  )
}
