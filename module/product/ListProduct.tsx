import { Button, Col, Image, Input, InputNumber, Pagination, Row, Select, Slider, Space } from 'antd'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import classNames from 'classnames/bind'
import style from "./Product.module.scss"
import Product from '../../components/product'
import { DollarCircleOutlined, MehOutlined, SearchOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useQuery } from 'react-query'
import { getAllProduct, searchAllProduct, getProductList, IProductItem } from '../../api/ApiProduct'
import { formatCurrency } from '../../constant/currencyFormatter'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import Loading from '../../components/loading'

function routerProcess(string) {
  const secondCharacter = string.charAt(1).toUpperCase();
  const stringWithoutFirstCharacter = string.slice(2);
  return secondCharacter + stringWithoutFirstCharacter;
}

const _ = require('lodash');

const cx = classNames.bind(style)
export default function ListProduct() {
  const {search} = store.getState();
  const router = useRouter()
  const path = router.pathname
  
  const [inputValue, setInputValue] = useState(200000);
  const [sortValue, setSortValue] = useState('rating')
  const [currentPage, setCurrentPage] = useState('1');
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])

  const handleChange = (value: string) => {
    setSortValue(value)
    if(value === 'low'){
      const sortedLow = data?.data.sort((a, b) => a.price - b.price);
      setProduct(sortedLow)
    } else if( value === 'high') {
      const sortedHigh = data?.data.sort((a, b) => b.price - a.price);
      setProduct(sortedHigh)
    } else if (value === 'popularity'){
    } else if(value === 'rating'){
      setProduct(data?.data)
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  }

  const handleClickFilter = () => {
    const filterProduct = []
    const filterPrice = data?.data.map((item, index) => {
      if(item.price <= inputValue){
        filterProduct.push(item)
      }
    })
    setProduct(filterProduct)
    
  }

  const handleChangeCategory = (category) => {
    const filterCategory = data?.data.filter((item) => {
      return item.category === category
    })
    setProduct(filterCategory)
   
  }
  
  const fetchData = async () => {
    if (path.includes('list-product')) {
      return getAllProduct(currentPage);
    } else {
      return searchAllProduct(currentPage, search);
    }
  };
  const queryKey = ['data', search, currentPage];
  const {isLoading, isError, isFetching, data, error} = useQuery(queryKey, fetchData);


  useEffect(()=> {
    if(data) {
      if(data.status === "success") {
        const uniqueCategories = _.uniqBy(data.data.map(item => item.category));
        setProduct(data.data)
        setCategory(uniqueCategories)
        console.log(data.data)
      }
      
    }
  }, [data])

  return (
    <>
         <Head >
            <title> {search ? 'Tìm kiếm' : 'Sản phẩm'}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name= {path.includes('list-product') ? 'Sản phẩm' : ''} />
          <div className={cx("product")}>
          <Row justify={'space-between'}>
              <Col span={17} className="gutter-row">
              {
                isLoading ? 
                <div className={cx("loading")} >
                  <Image src={require("../../assets/imgs/loading.png").default.src} preview={false} className={cx("loading-name")} />
                </div>
                :
                <>
                
                <div className={cx("sort")}>
                      <div className={cx("product-number")}>
                        {
                          data?.total_products != 0 ? `Hiển thị ${(parseInt(currentPage,10) - 1) * 12 + 0 + 1} – ${(parseInt(currentPage,10) - 1) * 12 + (data?.data.length) -1 + 1} của ${data?.total_products}  kết quả` : "Không có sản phẩm cần tìm"
                        }
                            
                      </div>
                      
                      <Space wrap>
                        <Select
                          defaultValue="rating"
                          style={{ width: 200 }}
                          onChange={handleChange}
                          value={sortValue}
                          options={[
                            { label: 'Sắp xếp theo độ phổ biến', value: 'popularity' },
                            { label: 'Sắp xếp theo đánh giá', value: 'rating' },
                            { label: 'Sắp xếp theo giá: từ thấp đến cao', value: 'low' },
                            { label: 'Sắp xếp theo giá: từ cao đến thấp', value: 'high' },
                          ]}
                        />
                        
                      </Space>
                </div>
                <Row className={cx("row-product")} gutter={16}>
                  { data?.total_products != 0 ? 
                    <>
                    {data?.data.map((item, index) => (
                      <>
                      <Product 
                        key={item.id} 
                        id={item.id}
                        name={item.name} 
                        price={item.price}
                        image={item.image}
                        category={item.category}
                        description={item.description}
                        long_description={item.long_description}
                        size={item.size}
                        tag={item.tag}
                        weight={item.weight}
                        star={item.Star}
                        col={8}
                      />
                      
                      </>
                      ))}
                      <Pagination
                        current={parseInt(currentPage,10)}
                        total={data?.total_products} 
                        pageSize={9}
                        onChange={handlePageChange}
                        className={cx("pagination")}
                      />
                      </>
                     : 
                    <div style={{textAlign: 'center', width: '100%', marginTop: '30px'}}>
                      <MehOutlined style={{color: '#5a5a5a', fontSize: '30px'}}/>
                    <p className={cx("notifications")}>Xin lỗi, chúng tôi chưa tìm thấy sản phẩm phù hợp với yêu cầu của bạn</p>
                    </div>
                  }
                </Row>
                </>
                 } 
              </Col>
              <Col span={6} className="gutter-row">
              
              <div className={cx('filter-price')}>
                Lọc theo giá
              </div>
              <Row justify='space-between'>
                <Col span={16}>
                  <Slider
                    min={0}
                    max={200000000}
                    step={20000000}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                    trackStyle={{backgroundColor: '#a58838'}}
                    railStyle={{backgroundColor: '#E5E5E5'}}
                    handleStyle={{}}
                  />
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      min={100000}
                      max={200000000}
                      style={{width: '100%'}}
                      value={inputValue}
                      onChange={onChange}
                    />
                  </Col>
              </Row>
              <div className={cx('price-range-wrap')}>
                <div className={cx('price-range')}>
                  Giá:  0 -  {formatCurrency(inputValue)} VNĐ
                </div>
                
                <div className={cx('price-range-btn')}>
                  <Button className={cx('btn')} onClick= {handleClickFilter}>Lọc</Button>
                  
                </div>
                </div>
              <div className={cx('product-category')}>
                <div className={cx('filter-price')}>
                  Danh mục sản phẩm
                </div>
                  
                  {
                    category.map((item,index)=> {
                      return (
                        <div className={cx('category-item')} key={index} onClick={() => handleChangeCategory(item)}>
                          {item}
                        </div>
                      )
                    })
                  }
              </div>
              <div className={cx('product-rcm')}>
                <div className={cx('filter-price')}>
                  Sản phẩm phổ biến
                </div>
                <div className={cx("product-item")}>
                  <Image src={require("../../assets/imgs/kitchenroom.png").default.src} preview={false} className={cx("product-img")}/>
                  <div className={cx("product-detail")}>
                    <div className={cx("product-name")}>Ghế nhà ăn</div>
                    <div className={cx("product-price")}>{formatCurrency(50000)}{" "} VNĐ</div>
                  </div>
                </div>  
                <div className={cx("product-item")}>
                  <Image src={require("../../assets/imgs/kitchenroom.png").default.src} preview={false} className={cx("product-img")}/>
                  <div className={cx("product-detail")}>
                    <div className={cx("product-name")}>Ghế nhà ăn</div>
                    <div className={cx("product-price")}>{formatCurrency(50000)}{" "} VNĐ</div>
                  </div>
                </div>  
                <div className={cx("product-item")}>
                  <Image src={require("../../assets/imgs/kitchenroom.png").default.src} preview={false} className={cx("product-img")}/>
                  <div className={cx("product-detail")}>
                    <div className={cx("product-name")}>Ghế nhà ăn</div>
                    <div className={cx("product-price")}>{formatCurrency(50000)}{" "} VNĐ</div>
                  </div>
                </div>  
                 
              </div>
              
              </Col>
          </Row>
      </div>
    </>
  )
}
