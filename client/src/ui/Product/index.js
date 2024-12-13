import { genericRenderer } from "../../lib/utils.js"; 
import { Option } from "./options/index.js";


const templateFile = await fetch("./src/ui/Product/template.html");
const template = await templateFile.text();

let ProductView = {};

ProductView.render = function(data) {
  let html = "";
  html += genericRenderer(template);


  let optionsHtml = "";
  for (let key in data) {
    optionsHtml += Option.render(data[key]);
  }

  html = html.replace("{{options}}", optionsHtml);



  return html;
};

export { ProductView };