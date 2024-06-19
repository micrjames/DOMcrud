import "./styles/main.scss";
import { DOMcrud } from "./ts/DOMcrud";
import { container } from "./ts/incs";

const domCrud = new DOMcrud(container);

const element = {
   which: "div",
   attrs: [{
	  attribute: "class",
	  value: "hidden"
   }],
   text: "some text",
   children: [{
	  which: "div",
	  attrs: [{
		 attribute: "class",
		 value: "child"
	  }]
   }]
};

domCrud.addEl(element, document);
