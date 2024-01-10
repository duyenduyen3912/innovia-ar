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
    getAllProduct: 'https://621ba522768a4e1020993c37.mockapi.io/api/products',
    getAllProductByCategory: 'http://172.20.10.5:8080/GetProductByCategory?category=',
    getAllProductByCategoryRCM: 'http://172.20.10.5:8080/GetProductByCategoryRCM?category=',
    searchAllProduct: 'http://172.20.10.5:8080/search?page=',
    getProductID: 'https://621ba522768a4e1020993c37.mockapi.io/api/products/',
    getProductInCart: 'http://172.20.10.5:8080/selectCart',
    getComment: 'http://172.20.10.5:8080/getReview?idproduct=',
    getCategory: 'http://172.20.10.5:8080/Category',
    addToCart : 'http://172.20.10.5:8080/addToCart',
    addReview: 'http://172.20.10.5:8080/addReview',
    checkReview: 'http://172.20.10.5:8080/checkReview?idproduct=',
    deleteProductInCart: 'http://172.20.10.5:8080/deleteCart',
    updateProductInCart: 'http://172.20.10.5:8080/updateCart',
    order: 'http://172.20.10.5:8080/order',
    getPopularProduct: 'http://172.20.10.5:8080/selectBestSellingProduct',
    getOrderList: 'http://172.20.10.5:8080/selectOrderList',
    getOrderItem: 'http://172.20.10.5:8080/selectOrderItem',
    deleteOrderItem: 'http://172.20.10.5:8080/cancelOrder',
    keywordRecommend: "http://172.20.10.5:8080/api/suggest-products?query="
}


export function getProductID(params: string): Promise<any> {
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

export function getAllProduct() {
    return sendGet(path.getAllProduct)
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

export function addReview(params) :Promise<String> {
    return sendPost(path.addReview, params)
}

export function checkReview(params) :Promise<any> {
    return sendGet(path.checkReview+ params.idproduct+ '&iduser='+ params.iduser)
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




