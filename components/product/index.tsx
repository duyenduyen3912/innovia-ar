import React, { useState } from 'react'
import classNames from 'classnames/bind'
import style from './Product.module.scss'
// import Image from 'next/image'
import 'animate.css'
import { Button, Col, Rate, Image, message } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { formatCurrency } from '../../constant/currencyFormatter'
import { useMutation, useQueryClient } from 'react-query'
import { addProductToCart, IAddProductToCart } from '../../api/ApiProduct'
import ApiUser from '../../api/ApiUser'
import { useRouter } from 'next/router'
const cx = classNames.bind(style)
export default function Product(props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const cart = queryClient.getQueryData(['cart', ApiUser.getIdUser()])
  const imageList: string[] = props.image?.split(";")
  const image: string[] = imageList || [];
  const addProductMutation = useMutation (
    async (payload : IAddProductToCart) =>  await addProductToCart (payload), 
    {
      onError: () => {
       
      },
      onSettled: async (data:any) => {
        if(data.status === "success") {
           message.success('Thêm sản phẩm thành công')
           queryClient.refetchQueries(['cart', ApiUser.getIdUser()])
          
         } else if(data.status === "failed"){
            message.error('Có lỗi xảy ra, hãy thử lại sau!')
         } else if(data.status === "ExpiredToken"){
          message.error('Hết phiên đăng nhập!')
          setTimeout(() => {
            router.push("/login")
          }, 2000);
       }

      }
    }
  )
  const onHandleAddtocart = () => {
    if(ApiUser.getIdUser()) {
      addProductMutation.mutate({
      iduser: ApiUser.getIdUser(),
      idproduct : props.id,
      quantity : 1,
      note: ''
    })
    } else {
      router.push("/login")
    }
    
  }
  return (
    <>
     
      <Col span={props.col ? props.col : 6} className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={8} xxl={props.col}>
        <div className={cx("product")}>
          <div className={cx("img-wrap")}>
            <Image src={image.length != 0 ? imageList[0] : ''} alt="juice" className={cx("img")} preview={false} />
            <div className={cx("product-btn")}>

              <Button 
                type='primary' 
                className={`animate__animated animate__bounceIn ${cx("btn")}`}
                onClick={onHandleAddtocart}  
                >Thêm vào giỏ </Button>
            </div>
          </div>
          <Link href={`/product/${props.id}`}>
            <div className={cx("product-name")}>{props.name}</div>
          </Link>

          <div className={cx("product-star")}>
            <Rate allowHalf disabled value={Math.round(props.star * 2) / 2} style={{ color: '#a58838', fontSize: '12px' }} />
          </div>
          <div className={cx("product-price")}>
            <span className={cx("product-text")}>Giá:</span>
            
            <span className={cx("price")}>{props.price ? formatCurrency(props.price) : ''} VNĐ</span>
          </div>
        </div>

      </Col>
    </>
    
  )
}
