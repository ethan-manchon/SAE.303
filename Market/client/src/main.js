// Import M
import { Orders } from "./data/Orders.js";
import { Product } from "./data/Product.js";
import { Customer } from "./data/Customer.js";

// Import V
import { OrdersView } from "./ui/orders/index.js";
import { topProductsView } from "./ui/topProducts/index.js";
import { SalesView } from "./ui/Sales/index.js";
import { SalesByCategView } from "./ui/SalesByCateg/index.js";
import { StockView } from "./ui/Stock/index.js";
import { ProductView } from "./ui/Product/index.js";
import { ChartProductView } from "./ui/chartProduct/index.js";
import { CustomerView } from "./ui/Customer/index.js";
import { ChartCustomerView } from "./ui/chartCustomer/index.js";
import { CountriesView } from "./ui/Countries/index.js";

let V = {
    header: document.querySelector("#header"),
    topProduct: document.querySelector("#topProduct"),
    sales: document.querySelector("#sales"),
    salesbycateg: document.querySelector("#salesbycateg"),
    product: document.querySelector("#product"),
    customer: document.querySelector("#customer"),
    chartproduct: document.querySelector("#chartproduct"),
    chartcustomer: document.querySelector("#chartcustomer"),
    stock: document.querySelector("#stock"),
    countries: document.querySelector("#countries")
};

let C = {};
C.init = function() {
    V.init();
};

V.init = async function () {
        V.renderOrders();
        V.renderTopProduct();
        V.renderSales();
        V.renderSaleByCateg();
        V.renderStock();
        V.renderProduct();
        V.renderCustomer();
        V.renderCountries();
}

    V.renderOrders = async function(){
        V.header.innerHTML = OrdersView.render(await Orders.fetch());
    },

    V.renderTopProduct = async function(){
        V.topProduct = topProductsView.render(await Orders.fetchTopProduct());
    },

    V.renderSales = async function(){
        V.sales = SalesView.render(await Orders.fetchMonthly());
    },

    V.renderSaleByCateg  = async function(){
        V.salesbycateg = SalesByCategView.render(await Orders.fetchCateg());
    },

    V.renderStock = async function(){
        V.stock = StockView.render(await Product.fetchStock());
    },

    V.renderProduct = async function(){
        V.product.innerHTML = ProductView.render(await Product.fetchAll());
        V.setupProductHandler();
        V.renderChartProducts(1);
        V.clearChartProduct();
    },

    V.setupProductHandler = async function(){
        document.getElementById('productStat').addEventListener('change', async function() {
            let id = document.getElementById('productStat').value;
            V.renderChartProducts(id);
        });
    },

    V.clearChartProduct = async function(){
        V.chartproduct = '';
    },

    V.renderChartProducts = async function(id){
        V.clearChartProduct();
        V.chartproduct = ChartProductView.render(await Product.fetchById(id));
    },

    V.renderCustomer = async function(){
        V.customer.innerHTML = CustomerView.render(await Customer.fetchAll());
        V.setupCustomerHandler();
        V.renderChartCustomer(1);
        V.clearChartCustomer();
    },

    V.setupCustomerHandler = async function(){
        document.getElementById('customerStat').addEventListener('change', async function() {
            let id = document.getElementById('customerStat').value;
            V.renderChartCustomer(id);
        });
    },

    V.clearChartCustomer = async function(){
        V.chartcustomer = '';
    },

    V.renderChartCustomer = async function(id){
        V.clearChartCustomer();
        V.chartcustomer = ChartCustomerView.render(await Customer.fetchById(id));
    }

    V.renderCountries = async function(){
        V.countries = CountriesView.render(await Orders.fetchCountries());
    }
C.init();
