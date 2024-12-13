import {getRequest} from '../lib/api-request.js';

let Product = {};

Product.fetchById = async function( id ){
    let data = await getRequest('product?id=' + id);
    return data;
}
Product.fetchStock = async function(){
    let data = await getRequest('product?status=stock');
    return data;
}
Product.fetchAll = async function(){
    let data = await getRequest('product');
    return data;
}

export {Product};


