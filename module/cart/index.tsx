import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import classNames from 'classnames/bind'
import style from "./Cart.module.scss"
import { Button, Image, InputNumber, message, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { CloseOutlined, DollarOutlined } from '@ant-design/icons'
import ButtonCustom from '../../components/Button'
import Head from 'next/head'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ApiUser from '../../api/ApiUser'
import { deleteProductInCart, getProductInCart, updateProductInCart } from '../../api/ApiProduct'
import { formatCurrency } from '../../constant/currencyFormatter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { logoutUser } from '../../redux/slices/UserSlice'
import { useDispatch } from 'react-redux'




const cx = classNames.bind(style)

interface DataType {
    key: string;
    product: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    
}





export default function Cart() {
    const queryClient = useQueryClient();
    const router = useRouter()
    const dispatch = useDispatch()
    const [cartList, setCartList] = useState([])
    const [subtotal,setSubtotal] = useState(0)
    const [totalQuantity,setTotalQuantity] = useState(0)
    const [productOrder, setProductOrder] = useState('')
    
    const { data : cart, refetch} = useQuery(['cart', ApiUser.getIdUser()], () => getProductInCart(ApiUser.getIdUser()),
    {
        enabled: ApiUser.getIdUser() !== null
    }
    );
    const deleteMutation = useMutation(
        async (payload: any) => await deleteProductInCart(payload),
        {
          onSuccess: async (data: any) => {
       
            if(data.status === "success") {
                message.success("Xoá sản phẩm thành công")
            } else if(data.status === "failed"){
                message.error("Có lỗi xảy ra, vui lòng thử lại!")
            } else if(data.status === "ExpiredToken"){
                message.error("Hết phiên đăng nhập, vui lòng đăng nhập lại!")
                dispatch(logoutUser())
                message.warning('Bạn cần đăng nhập lại để truy cập trang này!', 5);
                setTimeout(()=>{
                    router.push("/login");
                }, 5000)
            }
            refetch()
          }
        }
    )
    const updateMutation = useMutation(
        async (payload: any) => await updateProductInCart(payload),
        {
          onSuccess: async (data: any) => {
            if(data.status === "success") {
                refetch()
            } else if(data.status === "ExpiredToken"){
                message.error("Hết phiên đăng nhập, vui lòng đăng nhập lại!")
                dispatch(logoutUser())
                message.warning('Bạn cần đăng nhập lại để truy cập trang này!', 5);
                setTimeout(()=>{
                    router.push("/login");
                }, 5000)
            }  if(data.status === "failed") {
                message.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            }
            
          }
          
        }
    )
    const confirm = (id) =>{
        deleteMutation.mutate({
            iduser: ApiUser.getIdUser().toString(),
            idproduct: id
        })

    }
    
    const handleChangeQuantity = (id,value) => {
       
        updateMutation.mutate({
            idproduct: id,
            iduser: ApiUser.getIdUser(),
            quantity: value,
            note: ''
        })
        
    }

    const handleCheckout = () => {
       queryClient.setQueryData('subtotal', subtotal)
       queryClient.setQueryData('product-order', productOrder)
    }

    useEffect(()=> {
        if(cart?.status === "success"){
            const newCartData = cart?.data.map((item) => {
                const serverImage = item.image.split(";")
                return (
                    {
                        key: item.idproduct,
                        product: serverImage[0],
                        name: item.name,
                        price: item.price,
                        quantity: item.total_quantity,
                        subtotal: item.total_price
                    }
                )
            })
            const subtotal = cart?.data.reduce((sum,item)=>{
                return sum + parseInt(item.total_quantity,10) * parseInt(item.price,10)
            } ,0)
            const totalQuantity = cart?.data.reduce((sum,item)=>{
                return sum + parseInt(item.total_quantity,10) 
            } ,0)
            const product = cart?.data.map ((item)=> {
                return `${item.idproduct}-${item.total_quantity}`
            }) || []
            if(product.length != 0) {
                const productOrder = product.join(";")
                setProductOrder(productOrder)
            } else {
                const productOrder = product.join("")
                setProductOrder(productOrder)
            }
            setTotalQuantity(totalQuantity)
            setSubtotal(subtotal)
            setCartList(newCartData)
            refetch()
        }
      
    }, [cart])
   
    const columns: ColumnsType<DataType> = [
        {
            title: ' ',
            dataIndex: 'delete',
            key: 'delete',
            width: 50,
            
            render: (_, record) => {
                return (
                    <>
                        <Popconfirm
                            title="Confirm"
                            description="Do you want to remove this product"
                            onConfirm={()=> confirm(record.key)}
                           
                        >
                            <CloseOutlined />
                        </Popconfirm>
                    </>
                )
            }
            
        },
        {
            title: ' ',
            dataIndex: 'product',
            key: 'product',
            align: "center",
            width: 86,
            fixed: "left",
            render: (_, record) => {
                return (
                    <div className={cx("img-wrap")}>
    
                        <Image 
                        
                        src={record.product}
                        fallback={require("../../assets/imgs/logo.png")}
                        
                        />
                    </div>
                )
            }
        },
        {
            title: 'sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: 400,
           
            render: (_, record) => {
                return (
                    <>
                        <Link href={`/product/${record.key}`}>
                        
                        <span className={cx("product-name")}>{record.name}</span>
                        </Link>
                    </>
                )
            }
        },
        {
            title: 'giá',
            dataIndex: 'price',
            key: 'price',
            width: 130,
            render: (_, record) => {
                return (
                    <>
                        <DollarOutlined style={{fontSize: '15px'}}/>
                        <span className={cx("product-price")}>{formatCurrency(record.price)}</span>
                    </>
                )
            }
        },
        {
            title: 'số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 260,
            render: (_, record) => {
                return (
                    <>
                        <InputNumber 
                            size='large' 
                            min={1} max={100} 
                            defaultValue={record.quantity} 
                            onChange={(value) => handleChangeQuantity(record.key, value)}
                            className={cx("product-quantity")}/>
                    </>
                )
            }
        },
        {
            title: 'tổng',
            dataIndex: 'subtotal',
            key: 'subtotal',
            width: 180,
            render: (_, record) => {
                return (
                    <>
                        <DollarOutlined style={{fontSize: '15px'}}/>
                        <span className={cx("product-price")}>{formatCurrency(record.price* record.quantity)}</span>
                    </>
                )
            }
        }
    ]
   
  return (
    <>
         <Head >
            <title>Cart</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name="Cart" />
        <div className={cx("cart")}>
            <Table columns={columns} dataSource={cartList} className={cx("cart-table")}/>
            <div className={cx("total")} style={{textAlign: 'end', padding: '10px 90px', fontSize: "18px", color: "#000", fontWeight: "500"}}>
                <div className={cx("total-item")}>
                        <span className={cx("total-name")}>Tổng sản phẩm:</span>
                        <span className={cx("total-value")}>{totalQuantity ? formatCurrency(totalQuantity): 0} {" "} sản phẩm</span>
                </div>
                <div className={cx("total-item")}>
                        <span className={cx("total-name")}> Tổng thanh toán:</span>
                        <span className={cx("total-value")}>
                            
                            {subtotal ? formatCurrency(subtotal) : 0}
                            {" "} VNĐ
                        </span>
                </div>
               
            </div>
            <div style={{textAlign: 'center'}}>
                <Link href={'/checkout'}>
                    <Button className={cx("btn")} onClick={handleCheckout}>Đặt hàng</Button>
                </Link>
                
            </div>
            
        </div>
    </>
  )
}
