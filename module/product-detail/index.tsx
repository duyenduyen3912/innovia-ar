import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import { Col, Collapse, InputNumber, message, Rate, Row, Button, Pagination, Form } from 'antd';
import { Image as ImageAnt } from 'antd'
import style from "./ProductDetail.module.scss"
import classNames from 'classnames/bind';

import { DollarCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Product from '../../components/product';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addProductToCart, addReview, getComment, getProductID, IAddProductToCart } from '../../api/ApiProduct';
import { formatCurrency } from '../../constant/currencyFormatter';
import ApiUser from '../../api/ApiUser';
import { useRouter } from 'next/router';
import PageTitle from '../../components/PageTitle';
import RecommendProduct from '../../components/RecommendProduct';
import FormItem from 'antd/es/form/FormItem';
import ModelViewer from '../../components/Ar/ModelViewer';

const cx = classNames.bind(style)

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [quantity,setQuantity] = useState(1)
    const [currentPage, setCurrentPage] = useState('1')
    const [isReview, setIsReview] = useState(false)
    const [isOpenModel, setIsOpenModel] = useState(false)
    const queryClient = useQueryClient()
    const cart = queryClient.getQueryData(['cart', ApiUser.getIdUser()])
    const { isLoading, isError, isFetching, data, error } = useQuery(['product', id], () => getProductID(`${id}`),
        {
            enabled: id != undefined
        }
    );
    const {data: review, refetch} = useQuery(['review', currentPage], () => getComment({
        idproduct: `${id}`,
        page: currentPage
    }), {
        enabled: id != undefined
    })
    const addProductMutation = useMutation (
        async (payload : IAddProductToCart) =>  await addProductToCart (payload), 
        {
          onError: () => {
           
          },
          onSettled: async (data:any) => {
            if(data.status === "success") {
               message.success('Thêm sản phẩm thành công')
               queryClient.refetchQueries(['cart', ApiUser.getIdUser()])
              
             } else {
                message.error('Có lỗi xảy ra, hãy thử lại sau!')
             }
          }
        }
    )
    const addReviewMutation = useMutation(
        async (payload: any) => await addReview(payload),
        {
            onSettled: async (data : any) => {
                if(data === "success") {                  
                     message.success('Thêm đánh giá thành cômg')
                     refetch()
                    
                } else {
                    message.error('Có lỗi xảy ra, hãy thử lại sau!')
                }
            }
        }
    )
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    const onHandleSubmit = (values) => {
        addReviewMutation.mutate({
            idproduct: `${id}`,
            star: values.star,
            comment: values.comment
        })
        setIsReview(true)
    }
    
    
    const severImages: string[] = data?.data[0].image.split(";")
    const image: string[] = severImages || [];
    const onHandleAddtocart = () => {
        if(ApiUser.getIdUser()) {
             addProductMutation.mutate({
                iduser: ApiUser.getIdUser().toString(),
                idproduct : id.toString(),
                quantity : quantity,
                note: ''
            })
        } else {
            router.push("/login")
        }
    }
    const onHandleOpenModel = () => {
        setIsOpenModel(true);
    }
    const onCloseModal = useCallback(() => {
        setIsOpenModel(false);
    }, [setIsOpenModel]);
    
  
    return (
        <>
            <Head >
                <title>{data?.data[0].name}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/icon.png" />
            </Head>
            <PageTitle img={image.length != 0 ? severImages[0] : ''}/>
            <Row justify={"center"} className={cx("product-detail")} gutter={80} >
                <Col span={8} className="gutter-row">
                    <div className={cx("product-gallery")}>

                        <div className={cx("product-img-wrap")}>
                            <ImageAnt src={image.length != 0 ? severImages[0] : ''} alt="product-img" className={cx("img-origin")} preview={false} />
                        </div>
                    
                            <ImageAnt.PreviewGroup >
                                <Row gutter={8} className={cx("img-group")}>
                                {severImages?.map((imageUrl, index) => {
                                 
                                    if (index != 0 && imageUrl != '') {
                                        return (
                                            <Col className={`gutter-row ${cx("img-group-wrap")}`} span={8}>
                                                <ImageAnt
                                                    key={index}
                                                    src={imageUrl}
                                                    width={'100%'}
                                                    className={cx("img-thumbnail")}
                                                    style={{ overflow: "hidden" }}
                                                />
                                            </Col>
                                        )
                                    }
                                })}
                                </Row>
                            </ImageAnt.PreviewGroup>
                        

                    </div>


                </Col>
                <Col span={8} className="gutter-row">
                    <div className={cx("product-name")}>
                        {data?.data[0].name}
                    </div>
                    <div className={cx("product-price")}>
                        
                        <span className={cx("price")}>{formatCurrency(parseInt(data?.data[0].price, 10))} VNĐ</span>

                    </div>
                    <div className={cx("product-rate")}>
                        <Rate allowHalf disabled value={Math.round( data?.data[0].star * 2) / 2} style={{ color: "#a58838", fontSize: "12px" }} />
                        <span className={cx("number-rate")}>( {review?.status.includes('success') ? review?.data.length : 0} {" "} đánh giá)</span>
                    </div>
                    <div className={cx("product-infor")}>

                        <div className={cx("infor-wrap")}>
                            <span className={cx("infor-title")}>Danh mục:</span>
                            <span className={cx("infor-text")}>{data?.data[0].category_name}</span>
                        </div>
                        <div className={cx("infor-wrap")}>
                            <span className={cx("infor-title")}>Loại:</span>
                            <span className={cx("infor-text")}>{data?.data[0].tag}</span>
                        </div>
                    </div>
                    <div className={cx("product-intro")}>
                        {data?.data[0].description}
                    </div>
                    <div className={cx("product-order")}>
                        <InputNumber 
                            onChange={(value)=> setQuantity(value)}
                            min={1} max={10} 
                            defaultValue={1}
                            className={cx("input-number")} />
                        { data?.data[0].model && <Button onClick={onHandleOpenModel} className={cx("order-btn", "try-btn")}>Dùng thử</Button> }
                        <Button onClick={onHandleAddtocart} className={cx("order-btn")}>Thêm vào giỏ</Button>
                    </div>
                    
                </Col>
            </Row>
            <Row className={cx('review-row')}>
           
                <Collapse expandIcon={customExpandIcon} className={cx("product-description")}>
                    <Collapse.Panel header={<CustomHeader>Mô tả sản phẩm</CustomHeader>} key="1" className={cx("description")}>
                        <div className={cx("infor-wrap")}>
                            <div className={cx("infor-text")}>
                                {data?.data[0].long_description}
                            </div>
                        </div>
                    </Collapse.Panel>
                    <Collapse.Panel header={<CustomHeader>Thông tin sản phẩm</CustomHeader>} key="2" className={cx("description")}>
                        <div className={cx("infor-wrap")}>
                            <span className={cx("infor-title")}>Cân nặng:</span>
                            <span className={cx("infor-text")}>	{data?.data[0].weight}</span>
                        </div>
                        <div className={cx("infor-wrap")}>
                            <span className={cx("infor-title")}>Kích cỡ:</span>
                            <span className={cx("infor-text")}>{data?.data[0].size}</span>
                        </div>
                    </Collapse.Panel>
                    <Collapse.Panel header={<CustomHeader>Đánh giá</CustomHeader>} key="3" className={cx("description")}>
                        <div className={cx("review-wrap")}>
                            <div className={cx("review-title")}> 
                            {review?.status.includes('success') ? review?.data.length : 0} {" "}
                            đánh giá cho {data?.data[0].name}
                            </div>
                            {
                                
                                review?.status.includes('success') ? 
                                <> { review?.data.map((item, index) => {
                                    return (
                                        <div className={cx("review")} key={index}>
                                            <div className={cx("review-img-wrap")}>
                                                <ImageAnt src={require("../../assets/imgs/avt-logo.png").default.src} alt="reviewer" className={cx("reviewer-img")} preview={false} />
                                            </div>
                                            <div className={cx("review-content")}>

                                                <Rate allowHalf disabled value={Math.round(item.star * 2) / 2} className={cx("review-star")} style={{ color: "#a58838", fontSize: "13px" }} />
                                                <div className={cx("review-name")}>innovia lover</div>
                                                <div className={cx("review-text")}>
                                                    {item.comment}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) }
                               
                                <Pagination
                                    current={parseInt(currentPage,10)}
                                    total={review?.total_reviews} 
                                    pageSize={5}
                                    onChange={handlePageChange}
                                    className={cx("pagination")}
                                /> </>
                                : ''
                            }
                            
                        </div>
                        {!isReview ? 
                            <div className={cx("your-review")}>
                            <div className={cx("your-review-title")}>Thêm đánh giá</div>
                                <Form onFinish={onHandleSubmit}>
                                    <Form.Item
                                        label="Điểm"
                                        name="star"
                                        rules={[{ required: true, message: 'Hãy cho điểm sản phẩm bạn nhé!' }]}
                                        className={cx("your-review-title")}
                                    >
                                        <Rate style={{ color: "#a58838", fontSize: "13px" }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Đánh giá của bạn"
                                        name="comment"
                                        rules={[{ required: true, message: 'Hãy bình luận sản phẩm!' }]}
                                        className={cx("your-review-title")}
                                    >
                                    
                                        <textarea className={cx("your-review-input")} />
                                    </Form.Item>
                                    <Form.Item
                                        
                                    >
                                        <Button htmlType='submit' className={cx("order-btn") }>Gửi</Button>
                                    </Form.Item>
                                </Form>
                        </div>
                        : null
                        }
                        
                    </Collapse.Panel>
                </Collapse>
          
            </Row>
            <RecommendProduct category={data?.data[0].category_name} id = {data?.data[0].id} />
            {data?.data[0].model && 
                <ModelViewer 
                    open={isOpenModel} 
                    close={onCloseModal} 
                    name={data?.data[0].name} 
                    modelUrl={data?.data[0].model}
                    
                />
            }
        </>
    )
}

const CustomHeader = ({ children }) => {
    return (
        <span className={cx("descripttion-title")}>
            {children}
        </span>
    )
}

const customExpandIcon = (panelProps) => {
    const { isActive } = panelProps;
    return isActive ? <MinusOutlined /> : <PlusOutlined />;
};

