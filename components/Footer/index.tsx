import React from "react";
import classNames from "classnames/bind";
import style from "./Footer.module.scss";
import { Col, Row, Image} from "antd";
import { ClockCircleOutlined, FacebookOutlined, InstagramOutlined, PhoneOutlined, PushpinOutlined, TwitterSquareFilled, YoutubeOutlined } from "@ant-design/icons";


const cx = classNames.bind(style);
export default function Footer() {
  return (
    <div className={cx("footer")}>
      <Row justify="center" gutter={40} className={cx("footer-top")}>
        <Col  xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <div className={cx("restaurant")}>
              <div className={cx("restaurant-title")}>
                  <Image src={require("../../assets/imgs/innovia-logo.png").default.src} preview={false} className={cx("infor-image")}/>
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
                  Thứ 2 - Thứ 7 8:00 - 18:00/ Chủ nhật 8:00 - 22:00
                  </span>
                </div>
                <div className={cx("restaurant-infor")}>
                  <PushpinOutlined style={{fontSize: "17px", color: "#fff"}}/>
                  <span className={cx("text")}>	
                  Số 20, p. Hàng Đào, q. Hoàn Kiếm, tp. Hà Nội
                  </span>
                </div>
                
              </div>
          </div>
          
        </Col>
        <Col  xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
        <div className={cx("open-hours")}>
              <div className={cx("restaurant-title")}>
                  Giờ mở cửa
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Thứ hai</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Thứ ba</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Thứ tư</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Thứ năm</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Thứ sáu</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Thứ bảy</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 18: 00</span>
              </div>
              <div className={cx("hour")}>
                  <span className={cx("day")}>Chủ nhật</span>
                  <span className={cx("line")}></span>
                  <span className={cx("time")}>8: 00 – 22: 00</span>
              </div>
          </div>
        </Col>
        <Col  xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <div className={cx("instagram")}>
              <div className={cx("restaurant-title")}>
                  Thư viện thiết kế
              </div>
              <Row gutter={6} style={{marginBottom: "6px"}}>
                  <Col span={8} >
                    <div className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/p-living.png").default.src } alt="smoothie" className={cx("img")}/>
                    </div>
                  </Col>
                  <Col span={8} >
                    <div className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/p-kitchen.png").default.src } alt="smoothie" className={cx("img")}/>
                    </div>
                  </Col>
                  <Col span={8} >
                    <div className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/p-decor.png").default.src } alt="smoothie" className={cx("img")}/>
                    </div>
                  </Col>
                </Row>
                <Row gutter={6}>
                  <Col span={8} >
                    <div className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/p-kitchen-2.png").default.src } alt="smoothie" className={cx("img")}/>
                    </div>
                  </Col>
                  <Col span={8} >
                    <div className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/p-sleeping.png").default.src } alt="smoothie" className={cx("img")}/>
                    </div>
                  </Col>
                  <Col span={8} >
                    <div className={cx("img-wrap")}>
                      <Image src={require("../../assets/imgs/p-living-2.png").default.src } alt="smoothie" className={cx("img")}/>
                    </div>
                  </Col>
              </Row>
          </div>
          

        </Col>
      </Row>
      <Row justify="center" gutter={40} className={cx("footer-bottom")}>
        <Col span={5}>
          <div className={cx("year")}>
             © 2018 innovia, All Rights Reserved
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
