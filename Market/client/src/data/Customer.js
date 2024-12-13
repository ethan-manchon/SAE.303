import {getRequest} from '../lib/api-request.js';

let Customer = {};

Customer.fetchById = async function( id ){
    let data = await getRequest('customer?id=' + id);
    return data;
}

Customer.fetchAll = async function(){
    let data = await getRequest('customer');
    return data;
}

export {Customer};


