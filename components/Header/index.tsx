import { HomeOutlined, SearchOutlined, HeartOutlined, BookOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import style from "./Header.module.scss"
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import 'animate.css';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/UserSlice";
import ApiAdmin from "../../api/ApiAdmin";
import ApiUser from "../../api/ApiUser";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getProductInCart } from "../../api/ApiProduct";
const cx = classNames.bind(style)

function Header() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const onHandleLogout = () =>{
        dispatch(logoutUser())
        router.push("/login")
    } 
    const { data : cart, refetch} = useQuery(['cart', ApiUser.getIdUser()], () => getProductInCart({iduser: ApiUser.getIdUser() }),
    {
        enabled: ApiUser.getIdUser() !== null
    }
    );
    const handleOpenMenu = () => {
        if(isOpen) {
            setIsOpen(false)
            document.getElementById('menuResponsive').style.display = 'none'
        } else {
            setIsOpen(true)
            document.getElementById('menuResponsive').style.display = 'block'
        }
        
    }
    useEffect(()=> {
        if(cart?.status === "success") {
            const totalQuantity = cart?.data.reduce((sum,item)=>{
                return sum + parseInt(item.total_quantity,10) 
            } ,0)
            setTotalQuantity(totalQuantity)
        }
    }, [cart])

    return (
        <>
        
        <div className={cx("header")}>
            <Row className={cx("header-wrap")}>
                <Col  xs={0} sm={0} md={0} lg={0} xl={10} xxl={10} className={cx("left")}>
                    <li className={cx("menu-item", "logo")}>
                        <Image src={require("../../assets/imgs/Fooce.png")} width={100} alt="logo" />
                    </li>
                    <li className={cx("menu-item")} >
                        <Link href={"/"} className={cx("menu-item-link")} tabIndex= {0}>
                            Home
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/our-menu"} className={cx("menu-item-link")} tabIndex= {0}>
                            Menu
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/food"} className={cx("menu-item-link")} tabIndex= {0}>
                            Food
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/juice"} className={cx("menu-item-link")} tabIndex= {0}>
                            Juice
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/about-us"} className={cx("menu-item-link")} tabIndex= {0}>
                            About us
                        </Link>
                    </li>
                    { ApiAdmin.getRoleAdmin() === "1" ? 
                    <>
                   
                        <div className={`${cx('user')}`}>
                    <li className={cx("menu-item")}>
                        <Link href={"/admin"} className={cx("menu-item-link")} tabIndex= {0}>
                            Admin
                        </Link>  
                   </li>
                    <div className={`animate__zoomIn ${cx('user-menu', 'admin-menu')}`}>
                        <li className={cx('user-menu-item')}>
                            <Link href={'/admin/dashboard'} className={cx('item-link')}>
                                Dashboard
                            </Link>
                        </li>
                        <li className={cx('user-menu-item')}>
                            <Link href={'/admin/new-product'} className={cx('item-link')} >
                                New product
                            </Link>
                        </li>
                        <li className={cx('user-menu-item')}>
                            <Link href={'/admin/product'} className={cx('item-link')} >
                                Product Manager
                            </Link>
                        </li>
                       
                    </div> 
                    </div>
                    </>
                        : null
                    }
                    
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={7} className={cx("right")}>
                <li className={cx("menu-item", "search")}>
                    <div className={cx("search-wrap")}>
                        <SearchOutlined style={{ fontSize: '18px', color: '#FBBCC0', fontWeight: '600' }}/>
                        <input type = "text" placeholder="Search here ..." className={cx("search-input")}/>
                    </div>
                </li>
                <li className={cx("menu-item", "icon", "cart")}>
                    <div style={{position: 'relative', minWidth: '35px'}}>
                        <Link href={"/cart"}>
                        <ShoppingCartOutlined style={{ fontSize: '24px', color: '#FBBCC0', fontWeight: '600', width: '10%', minWidth: '24px' }}/>
                        <span className={cx('quantity')}>{totalQuantity}</span>
                    </Link>
                    </div>
                    
                </li>
                
                    {ApiUser.isLogin() ?
                    <div className={`${cx('user', "user-responsive")}`}>
                    <li className={cx("menu-item")}>
                       
                           <UserOutlined className={cx('user-icon')} />
                           
                   </li>
                    <div className={`animate__zoomIn ${cx('user-menu')}`}>
                        <li className={cx('user-menu-item')}>
                            <Link href={'/my-account'} className={cx('item-link')}>
                                My account
                            </Link>
                        </li>
                        <li className={cx('user-menu-item')}>
                            <Link href={'/login'} className={cx('item-link')} onClick={onHandleLogout}>
                                Logout
                            </Link>
                        </li>
                       
                    </div> 
                    </div>
                    :
                    <li className={cx("menu-item")}>
                        <Link href={"/login"} className={cx("menu-item-link")} tabIndex= {0}>
                            Login
                        </Link>
                    </li>
                    }
                    
                    <li className={cx("menu-item", "list-responsive")} onClick={handleOpenMenu}>
                        {
                            isOpen ?
                             <CloseOutlined style={{ fontSize: '24px', color: '#FBBCC0', fontWeight: '600', cursor: 'pointer' }}/>
                            : <MenuOutlined style={{ fontSize: '24px', color: '#FBBCC0', fontWeight: '600', cursor: 'pointer' }}/>
                        }
                    </li>
               
                
                </Col>
            </Row>
           
        </div>
         <div className={`animate__animated animate__slideInDown ${cx('menu-responsive')}`} id="menuResponsive">
         <div className={cx('menu')}>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/'} className={cx('menu-responsive-link')}>
                     Home
                 </Link>
             </li>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/our-menu'} className={cx('menu-responsive-link')}>
                     Menu
                 </Link>
             </li>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/food'} className={cx('menu-responsive-link')}>
                     Food
                 </Link>

             </li>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/juice'} className={cx('menu-responsive-link')}>
                     Juice
                 </Link>
             </li>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/about-us'} className={cx('menu-responsive-link')}>
                     About us
                 </Link>
             </li>
             
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/my-account'} className={cx('menu-responsive-link')}>
                     My account
                 </Link>
             </li>
             <li className={cx('menu-responsive-item')}>
                     <Link href={'/login'} className={cx('item-link')} onClick={onHandleLogout}>
                         Logout
                     </Link>
             </li>
             
         </div>
     </div>
    </>
     )
}

export default Header;