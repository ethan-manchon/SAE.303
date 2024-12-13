import {getRequest} from '../lib/api-request.js';

let Orders = {};

Orders.fetch = async function(){
    let data = await getRequest('orders');
    return data;
}
Orders.fetchTopProduct = async function(){
    let data = await getRequest('orders?status=topProduct');

    return data;
}
Orders.fetchMonthly = async function(){
    let data = await getRequest('orders?status=monthly');

    return data;
}
Orders.fetchCountries = async function(){
    let data = await getRequest('orders?status=countries');

    return data;
}
Orders.fetchCateg = async function(){
    let data = await getRequest('orders?status=categ');

    return data;
}

export {Orders};


