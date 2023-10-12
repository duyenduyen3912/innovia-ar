import { HomeOutlined, SearchOutlined, HeartOutlined, BookOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Menu, Row, Image} from "antd";
import style from "./Header.module.scss"
import classNames from "classnames/bind";
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
    const path = router.pathname
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
        function handleScroll() {
            var header = document.getElementById('header');
            var text = document.getElementsByClassName(cx('menu-item-link'))
            
            if (window.scrollY > 50) {
                header.classList.add(cx("scrolled"));
                for(let i = 0; i < text.length; i++){
                    text[i].classList.add(cx('scrolled-color'))
                }
                document.getElementById('search').classList.add(cx('scrolled-color'))
                document.getElementById('cart').classList.add(cx('scrolled-color'))
                document.getElementById('user').classList.add(cx('scrolled-color'))
                console.log(document.getElementById('search'))
            } else {
                header.classList.remove(cx("scrolled"));
                for(let i = 0; i < text.length; i++){
                    text[i].classList.remove(cx('scrolled-color'))
                }
                document.getElementById('search').classList.remove(cx('scrolled-color'))
                document.getElementById('cart').classList.remove(cx('scrolled-color'))
                document.getElementById('user').classList.remove(cx('scrolled-color'))
            }
        }
      
       
        
       
    },[])
    
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
        
        <div className={cx("header")} id="header">
            <Row className={cx("header-wrap")}>
                <Col  xs={0} sm={0} md={0} lg={0} xl={10} xxl={10} className={cx("left")}>
                    <li className={cx("menu-item", "logo")}>
                        <Image src={require("../../assets/imgs/innovia-logo2.png").default.src} preview={false} width={100} alt="logo" />
                    </li>
                    <li className={cx("menu-item")} >
                        <Link href={"/"} className={cx("menu-item-link")} tabIndex= {0}>
                            Trang chủ
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/design"} className={cx("menu-item-link")} tabIndex= {0}>
                            Thiết kế
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/list-product"} className={cx("menu-item-link")} tabIndex= {0}>
                            Sản phẩm
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
                <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={4} className={cx("right")}>
                <li className={cx("menu-item", "search")}>
                    <div className={cx("search-wrap")}>
                        <SearchOutlined className={cx("search-icon")} id="search" />
                        
                    </div>
                </li>
                <li className={cx("menu-item", "icon", "cart")}>
                    <div style={{position: 'relative', minWidth: '35px'}}>
                        <Link href={"/cart"}>
                        <ShoppingCartOutlined className={cx("cart-icon")} id="cart"/>
                        <span className={cx('quantity')}>{totalQuantity}</span>
                    </Link>
                    </div>
                    
                </li>
                
                    {ApiUser.isLogin() ?
                    <div className={`${cx('user', "user-responsive")}`}>
                    <li className={cx("menu-item")}>
                       
                           <UserOutlined className={cx('user-icon')} id="user"/>
                           
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
                    <li className={cx("menu-item", "user-responsive")}>
                        <Link href={"/login"} className={cx("menu-item-link")} tabIndex= {0}>
                            Login
                        </Link>
                    </li>
                    }
                    
                    <li className={cx("menu-item", "list-responsive")} onClick={handleOpenMenu}>
                        {
                            isOpen ?
                             <CloseOutlined style={{ fontSize: '24px', color: '#a58838', fontWeight: '600', cursor: 'pointer' }}/>
                            : <MenuOutlined style={{ fontSize: '24px', color: '#a58838', fontWeight: '600', cursor: 'pointer' }}/>
                        }
                    </li>
               
                
                </Col>
            </Row>
           
        </div>
         <div className={`animate__animated animate__slideInDown ${cx('menu-responsive')}`} id="menuResponsive">
         <div className={cx('menu')}>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/'} className={cx('menu-responsive-link')}>
                     Trang chủ
                 </Link>
             </li>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/design'} className={cx('menu-responsive-link')}>
                     Thiết kế
                 </Link>
             </li>
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/list-product'} className={cx('menu-responsive-link')}>
                    Sản phẩm
                 </Link>

             </li>
             
             
             <li className={cx('menu-responsive-item')}>
                 <Link href={'/my-account'} className={cx('menu-responsive-link')}>
                     My account
                 </Link>
             </li>
             <li className={cx('menu-responsive-item')}>
                     <Link href={'/login'} className={cx('item-link')} onClick={onHandleLogout}>
                         {ApiUser.isLogin() ? "Logout" : "Login"}
                     </Link>
             </li>
             
         </div>
     </div>
    </>
     )
}

export default Header;