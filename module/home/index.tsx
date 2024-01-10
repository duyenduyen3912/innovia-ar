import { Carousel, Col, Row, Image } from "antd";
import classNames from "classnames/bind";
import style from "./Home.module.scss"
import 'animate.css';
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllProduct, getProductInCart } from "../../api/ApiProduct";
import Card from "../../components/Card";
import Project from "../../components/Project";
import { TrophyOutlined } from "@ant-design/icons";


const cx = classNames.bind(style)  

function Homepage() {
    const inView = true;
    const [juice, setJuice] = useState([])
    const [food, setFood] = useState([])
    const { isLoading, data } = useQuery(['getAllProduct' ],() =>  getAllProduct() )
   

    useEffect(()=>{
        data?.data.map((item, index) => {
            
            if(item.tag.includes("Juice")) {
                setJuice((prev) => [...prev, item])
                
            } else if(item.tag.includes("Food")){
                setFood((prev) => [...prev, item])
            }
        })
       
    },[data])
 
    return (
       
       <div className={cx("homepage")}>
        <div className={cx("carousel-wrap")}>
            <div className={cx("carousel")} >
                <Carousel autoplay  waitForAnimate={true}>
                    <div className={cx("item_wrap")} >
                        <Image src={require("../../assets/imgs/2.png").default.src}  className={cx("image-carousel")} preview={false}/>
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/3.png").default.src}  className={cx("image-carousel")} preview={false}/>
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/4.png").default.src}  className={cx("image-carousel")} preview={false}/>
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/5.png").default.src}  className={cx("image-carousel")} preview={false}/>
                       
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/6.png").default.src}  className={cx("image-carousel")} preview={false}/>
                    </div>
                   
                </Carousel>
            </div>
        </div>
        <div className={cx("service")}>
            <p className={cx("service-title")}>CHÚNG TÔI <span className={cx("text-highlight")}>CUNG CẤP</span> NHỮNG GÌ</p>
            <p className={cx("service-description")}>Bạn đang loay hoay tìm kiếm thiết kế nội thất cho căn nhà của mình? Đừng lo lắng, chúng tôi sẽ cung 
            cấp miễn phí các thiết kế nội thất và đồ nội thất phù hợp với nhu cầu của bạn
            </p>
            <Row gutter={16} style={{marginBottom: '16px', marginTop: "30px"}}>
                <Col className="gutter-row" span={15}>
                    <Card src={"livingroom"} name="Phòng khách"/>
                </Col>
                <Col className="gutter-row" span={9}>
                    <Card src={"sleepingroom"} name="Phòng ngủ"/>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                    <Card src={"officeroom"} name="Văn phòng"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Card src={"decor"} name="Trang trí nội thất"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Card src={"kitchenroom"} name="Phòng ăn"/>
                </Col>
            </Row>
        </div>
        <div className={cx("project")}>
        <p className={cx("service-title")}>NHỮNG DỰ ÁN <span className={cx("text-highlight")}>TỐT NHẤT</span> </p>
        <p className={cx("service-description")}>Những dự án chất lượng được các kỹ sư nổi tiếng thực hiện nhận được phản ứng
        tích cực từ khách hàng
        </p>
            <Row gutter={16} style={{marginBottom: '16px', marginTop: "30px"}}>
                <Col className="gutter-row" span={8}>
                    <Project src="p-kitchen"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Project src="p-office"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Project src="p-sleeping"/>
                </Col>
            </Row>
            <Row gutter={16} style={{marginBottom: '16px'}}>
                <Col className="gutter-row" span={8}>
                    <Project src="p-living-2"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Project src="p-decor"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Project src="p-sleeping-2"/>
                </Col>
            </Row>
            <Row gutter={16} style={{marginBottom: '16px'}}>
                <Col className="gutter-row" span={8}>
                    <Project src="p-kitchen-2"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Project src="p-living-3"/>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Project src="p-living"/>
                </Col>
            </Row>
        </div>
        <div className={cx("about-us")}>
            <p className={cx("service-title")}>VỀ <span className={cx("text-highlight")}>CHÚNG TÔI</span> </p>
            <p className={cx("service-description")}>Đội ngũ thiết kế dày dặn kinh nghiệm luôn mang tới trải nghiệm tốt 
                nhất cho khách hàng.
            </p>
            <Row gutter={30} style={{marginTop: "50px", marginBottom: "50px"}}>
                <Col className={cx("item-col", "border")} span={6}>
                        <span className={cx("item-number")}>20</span>
                        <TrophyOutlined className={cx("item-icon")}/>
                        <div className={cx("item-name")}>GIẢI THƯỞNG</div>
                </Col>
                <Col className={cx("item-col", "border")} span={6}>
                        <span className={cx("item-number")}>2K</span>
                        <TrophyOutlined className={cx("item-icon")}/>
                        <div className={cx("item-name")}>SẢN PHẨM</div>
                </Col>
                <Col className={cx("item-col", "border")} span={6}>
                        <span className={cx("item-number")}>432</span>
                        <TrophyOutlined className={cx("item-icon")}/>
                        <div className={cx("item-name")}>KHÁCH HÀNG</div>
                </Col>
                <Col className={cx("item-col")} span={6}>
                        <span className={cx("item-number")}>12</span>
                        <TrophyOutlined className={cx("item-icon")}/>
                        <div className={cx("item-name")}>KỸ SƯ</div>
                </Col>
            </Row>
            
        </div>
       </div>
       
     )
}

export default Homepage;