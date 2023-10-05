import ApiUser from "./ApiUser";
import { sendGet, sendPost } from "./axios";


export interface IProductItem {
    total_pages: string,
    total_products: string,
    data: [{
        Star: number,
        category: string,
        description: string,
        id: number,
        image: string,
        long_description: string,
        name: string,
        price: string,
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

const path = {
    getAllProduct: '/DGetAllProduct?page=',
    getAllProductByTag: '/DProduct?tag=',
    getProductID: '/DProduct?id=',
    getProductInCart: '/DCart.php?action=get',
    getComment: '/DRate?id=',
    getHighRateProduct: '/',
    addToCart : '/DCart?action=add',
    deleteProduct: '/DDelete.php',
    deleteProductInCart: '/DCart?action=delete',
    updateProductInCart: '/DCart?action=update',
    addNewProduct: '/DNewProduct.php',
    updateProduct: '/DUpateProduct.php',
    order: '/DOrder?action=order'
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


