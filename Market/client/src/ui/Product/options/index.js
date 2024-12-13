import { genericRenderer } from "../../../lib/utils.js"; 

const templateFile = await fetch("src/ui/Product/options/template.html");
const template = await templateFile.text();

let Option = {};

Option.render = function(data) {
    let html = "";
    html += genericRenderer(template, data);
    return html;
};

export { Option };