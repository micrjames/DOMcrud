import "./styles/main.scss";
import { DOMcrud } from "./ts/DOMcrud";
import { container } from "./ts/incs";

const domCrud = new DOMcrud(container);

const element_defn = {
   which: "div",
   attrs: [{
	  name: "class",
	  value: "hidden"
   }],
   text: "some text",
   children: [{
	  which: "div",
	  attrs: [{
		 name: "class",
		 value: "child"
	  }]
   }]
};
export const elements_defn = [
   element_defn,
   element_defn,
   element_defn
];

domCrud.addEls(elements_defn, document);
