import ApiUser from "./ApiUser";
import { sendGet, sendPost } from "./axios";


export interface IProductItem {
    status: string,
    total_pages: number,
    total_products: number,
    index_page: string,
    data: [{
        star: number,
        category: string,
        description: string,
        id: number,
        image: string,
        long_description: string,
        name: string,
        price: number,
        size: string,
        tag: "Bộ" | "Đơn",
        weight: string,
        category_name: string,
        model: string
    }]

}

export interface IProductListItem {
    status: string,
    total_pages: number,
    total_products: number,
    index_page: string,
    data: [{
        Star: number,
        category: string,
        description: string,
        id: number,
        image: string,
        long_description: string,
        name: string,
        price: number,
        size: string,
        tag: "Juice" | "Food",
        weight: string
    }],
    recommend_product : [{
        Star: number,
        category: string,
        description: string,
        id: number,
        image: string,
        long_description: string,
        name: string,
        price: number,
        size: string,
        tag: "Juice" | "Food",
        weight: string
    }]

}

export interface IComment {
    status: string,
    total_pages: number,
    total_reviews: number,
    index_page:number,
    data: [{
        idproduct: number,
        star: number,
        comment: string,
    }]
}

export interface IAddProductToCart {
    iduser: number,
    idproduct: number,
    quantity: number,
    note: string
}

export interface ITagListPath {
    tag: string,
    indexPage: string
}

export interface IDataRes {
    status: string,
    data: String[]
}


const path = {
    getAllProduct: 'http://localhost:8080/products?page=',
    getAllProductByCategory: 'http://localhost:8080/GetProductByCategory?category=',
    getAllProductByCategoryRCM: 'http://localhost:8080/GetProductByCategoryRCM?category=',
    searchAllProduct: 'http://localhost:8080/search?page=',
    getProductID: 'http://localhost:8080/DProduct?id=',
    getProductInCart: 'http://localhost:8080/selectCart',
    getComment: 'http://localhost:8080/getReview?idproduct=',
    getCategory: 'http://localhost:8080/Category',
    addToCart : 'http://localhost:8080/addToCart',
    addReview: 'http://localhost:8080/addReview',
    deleteProductInCart: 'http://localhost:8080/deleteCart',
    updateProductInCart: 'http://localhost:8080/updateCart',
    order: 'http://localhost:8080/order',
    getPopularProduct: 'http://localhost:8080/selectBestSellingProduct',
    getOrderList: 'http://localhost:8080/selectOrderList',
    getOrderItem: 'http://localhost:8080/selectOrderItem',
    deleteOrderItem: 'http://localhost:8080/cancelOrder',
    keywordRecommend: "http://localhost:8080/api/suggest-products?query="
}


export function getProductID(params: string): Promise<IProductItem> {
    return sendGet(path.getProductID + params)
}

export function getProductByCategory(params): Promise<IProductItem> {
    return sendGet(path.getAllProductByCategory + params.category + '&page=' + params.page)
}


export function getComment(params): Promise<IComment> {
    return sendGet(path.getComment + params.idproduct + '&page=' + params.page)
}

export function getRecommend(params): Promise<String[]> {
    return sendGet(path.keywordRecommend + params)
}

export function getCategory(): Promise<IDataRes> {
    return sendGet(path.getCategory)
}

export function getPopularProduct(): Promise<any> {
    return sendGet(path.getPopularProduct)
}

export function searchAllProduct(params, body) {
    return sendPost(path.searchAllProduct + params, body, {
        "Content-Type": "application/json"
    })
}

export function getAllProduct(params) {
    return sendGet(path.getAllProduct+params)
}

export function getOrderItem(params): Promise<any> {
    return sendPost(path.getOrderItem, params, {
        Authorization : ApiUser.getAuthToken(),
        "Content-Type": "application/json"
    })
}

export function getProductInCart(params): Promise<any> {
    return sendPost(path.getProductInCart, params, {
        Authorization : ApiUser.getAuthToken(),
        "Content-Type": "application/json"
    })
}


export function addProductToCart(params :IAddProductToCart): Promise<any> {
    return sendPost(path.addToCart, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function addReview(params) :Promise<any> {
    return sendPost(path.addReview, params)
}


export function deleteProductInCart(params: string) : Promise<any> {
    return sendPost(path.deleteProductInCart, params, {
        Authorization : ApiUser.getAuthToken(),
        "Content-Type": "application/json"
    })
}

export function updateProductInCart(params: any) : Promise<any> {
    return sendPost(path.updateProductInCart, params, {
        Authorization : ApiUser.getAuthToken(),
        "Content-Type": "application/json"
    })
}



export function order(params: any) : Promise<any> {
    return sendPost(path.order, params, {
        Authorization : ApiUser.getAuthToken(),
        "Content-Type": "application/json"
    })
}

export function getListOrder(params: any) : Promise<any> {
    return sendPost(path.getOrderList, params, {
        Authorization : ApiUser.getAuthToken(),
        "Content-Type": "application/json"
    })
}

export function cancelOrder(params: any) : Promise<any> {
    return sendPost(path.deleteOrderItem, params, {
        Authorization : ApiUser.getAuthToken(),
        "Content-Type": "application/json"
    })
}




