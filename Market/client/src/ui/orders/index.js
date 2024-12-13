import { genericRenderer } from "../../lib/utils.js"; 

const templateFile = await fetch("./src/ui/orders/template.html");
const template = await templateFile.text();

let OrdersView = {};

OrdersView.render = function(data) {
    let html = "";
    html += genericRenderer(template, data);
    return html;
};
    
export { OrdersView };