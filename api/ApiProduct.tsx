import ApiUser from "./ApiUser";
import { sendGet, sendPost } from "./axios";


export interface IProductItem {
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
    }]

}

export interface IComment {
    status: string,
    data: [{
        Star: number,
        Comment: string,
    }]
}

export interface IAddProductToCart {
    iduser: string,
    idproduct: string,
    quantity: number,
    note: string
}

export interface ITagListPath {
    tag: string,
    indexPage: string
}

export interface ISearchPath {
    keyword: string,
    page: string
}

const path = {
    getAllProduct: 'http://localhost:8080/products?page=',
    getAllProductByTag: 'https://chippisoft.com/API/DProduct?tag=',
    getAllProductByKeyword: 'http://localhost:8080/search?keyword=',
    getAllProductByImage: 'http://localhost:8080/search-by-image?page=',
    getProductID: 'http://localhost:8080/DProduct?id=',
    getProductInCart: 'https://chippisoft.com/API/DCart.php?action=get',
    getComment: 'https://chippisoft.com/API/DRate?id=',
    getHighRateProduct: 'https://chippisoft.com/API/',
    addToCart : 'https://chippisoft.com/API/DCart?action=add',
    deleteProduct: 'https://chippisoft.com/API/DDelete.php',
    deleteProductInCart: 'https://chippisoft.com/API/DCart?action=delete',
    updateProductInCart: 'https://chippisoft.com/API/DCart?action=update',
    addNewProduct: 'https://chippisoft.com/API/DNewProduct.php',
    updateProduct: 'https://chippisoft.com/API/DUpateProduct.php',
    order: 'https://chippisoft.com/API/DOrder?action=order'
}

export function getProductList(params: ITagListPath): Promise<any> {
    return sendGet(path.getAllProductByTag + params.tag + "&page=" +params.indexPage )
}

export function getProductID(params: string): Promise<IProductItem> {
    return sendGet(path.getProductID + params)
}

export function getComment(params: string): Promise<IComment> {
    return sendGet(path.getComment + params)
}

export function getProductByKeyword(params: ISearchPath): Promise<IProductItem> {
    return sendGet(path.getAllProductByKeyword + params.keyword + '&page=' + params.page)
}

export function getProductByImage(params, body): Promise<IProductItem> {
    return sendPost(path.getAllProductByImage + params, body, {
        "Content-Type": "application/json"
    })
}

export function getAllProduct(params): Promise<IProductItem> {
    return sendGet(path.getAllProduct+params)
}

export function getProductInCart(params): Promise<any> {
    return sendPost(path.getProductInCart, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function addProductToCart(params :IAddProductToCart): Promise<any> {
    return sendPost(path.addToCart, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function deleteProduct(params: string) : Promise<any> {
    return sendPost(path.deleteProduct, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function deleteProductInCart(params: string) : Promise<any> {
    return sendPost(path.deleteProductInCart, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function updateProductInCart(params: any) : Promise<any> {
    return sendPost(path.updateProductInCart, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function addNewProduct(params: any) : Promise<any> {
    return sendPost(path.addNewProduct, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function updateProduct(params: any) : Promise<any> {
    return sendPost(path.updateProduct, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function order(params: any) : Promise<any> {
    return sendPost(path.order, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

