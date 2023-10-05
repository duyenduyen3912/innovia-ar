import { Carousel, Col, Row } from "antd";
import classNames from "classnames/bind";
import style from "./Home.module.scss"
import 'animate.css'
import Image from "next/image"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Product from "../../components/product";
import MenuType from "../../components/Menu";
import image from "../../constant/img/image";
import { useQuery } from "react-query";
import { getAllProduct, getProductInCart } from "../../api/ApiProduct";
import Loading from "../../components/loading";
import ApiUser from "../../api/ApiUser";

const cx = classNames.bind(style)  

function Homepage() {
    const inView = true;
    const [juice, setJuice] = useState([])
    const [food, setFood] = useState([])
    const { isLoading, data } = useQuery(['getAllProduct' ],() =>  getAllProduct('1') )
   

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
                <Carousel autoplay dotPosition="right" waitForAnimate={true}>
                    <div className={cx("item_wrap")} >
                            <Image src={require("../../assets/imgs/2.png")} alt="drink"  className={cx("image-carousel")} />
                           
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/3.png")} alt="drink" className={cx("image-carousel")}/>
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/4.png")} alt="drink" className={cx("image-carousel")}/>
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/5.png")} alt="food" className={cx("image-carousel")}/>
                       
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/6.png")} alt="food" className={cx("image-carousel")}/>
                       
                    </div>
                   
                </Carousel>
            </div>
           
        </div>
        <div className={cx("hight-rate-menu")}>
            <div className={cx("juice")}>
                <div className={cx("logo-wrap")}>
                <Image src={(require("../../assets/imgs/logo.png"))} alt="border" className={cx("logo")}/>

                </div>
                <div className={cx("title-wrap")}>
                    <div className={cx("title")}>
                    Smoothies & Juices
                    </div>
                </div>
                <div className={cx("product-wrap")}>
                <Row gutter={16}>
                    {
                        juice.map((item,index) => {
                            
                            if(index <= 11) {

                                return (
                                    <Product 
                                        key={item.id}
                                        col={6}
                                        name={item.name} 
                                        image = {item.image}
                                        id = {item.id}
                                        star = {item.Star}
                                        price = {item.price}
                                    />
                                )
                            }
                            
                        })
                    }
                </Row>
                </div>
            </div>
            <div className={cx("food")}>
            <div className={cx("logo-wrap")}>
                <Image src={(require("../../assets/imgs/logo.png"))} alt="border" className={cx("logo")}/>

                </div>
                <div className={cx("title-wrap")}>
                    <div className={cx("title")}>
                    Foods & Pizza
                    </div>
                </div>
                <div className={cx("product-wrap")}>
                <Row gutter={16}>
                    {
                        food.map((item,index) => {
                            if(index <= 8) {
                                return (
                                    <Product 
                                        col={6}
                                        name={item.name} 
                                        image = {item.image}
                                        id = {item.id}
                                        star = {item.Star}
                                        price = {item.price}
                                    />
                                )
                            }  
                        })
                    }
                </Row>
                </div>
            </div>
          
        </div>
        <div className={cx("favourite-menu")}>
            <MenuType bg={image.menuBg} menuType="Favourite"/>
            <Image src={require("../../assets/imgs/pink-straw.png")} alt="pink-straw" className={cx("pink-straw")}/>
            <Image src={require("../../assets/imgs/blueberry.png")} alt="pink-straw" className={cx("blueberry")}/>
        </div>
           
       </div>
       
     )
}

export default Homepage;