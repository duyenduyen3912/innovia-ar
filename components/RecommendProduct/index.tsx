import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Style from './Rcm.module.scss'
import { Row } from 'antd'
import { useQuery } from 'react-query';
import { getProductByCategory, IProductItem } from '../../api/ApiProduct';
import Product from '../product';

const cx = classNames.bind(Style);
export default function RecommendProduct(props) {
    const [visibleProduct, setVisibleProduct] = useState(4)
    const [data,setData] = useState<IProductItem>();
    const {data: categoryProduct} = useQuery(['category_product', props.category],() => getProductByCategory({
        category: props.category,
        page: 1
    }))

    const handleShowmore = () => {
        setVisibleProduct(categoryProduct?.total_products)
    }
    const handleHidden = () => {
        setVisibleProduct(4)
    }
    useEffect(()=> {
        if(categoryProduct) {
            if(categoryProduct.status) {
                console.log(categoryProduct)
                console.log(props.id)
                categoryProduct.data.map((item, index) => {
                    if(item.id === props.id){
                       categoryProduct.data.splice(index,1) 
                       
                    } 
                    setData(categoryProduct)
                })
            }
        }
    },[categoryProduct])
 
  return (
    <div className={cx("rcm-product")} >
        <div className={cx("rcm-title")}>
            <div className={cx("title")}>
                Bạn có thể thích
            </div>
            {
                visibleProduct < 5 && data?.total_products > 4 ? 
                (
                    <div className={cx("title", "more")} onClick={handleShowmore}>
                        Xem thêm
                    </div>
                ) : data?.total_products > 4 &&
                (
                    <div className={cx("title", "more")} onClick={handleHidden}>
                        Ẩn bớt
                    </div>
                )
            }
            
        </div>
        <Row justify={"start"}gutter={20} style={{width: '100%', paddingLeft: '10px'}}>
            {
                data?.data.slice(0, visibleProduct).map((item, index) => {
                    
                    if(item.id !== props.id)
                    return (
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
                            col={6}
                        />
                      </>
                    )
                })
            }

            
        </Row>
    </div>
  )
}
