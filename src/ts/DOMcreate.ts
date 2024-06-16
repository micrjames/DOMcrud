import { IAttr, IEl } from "./iters";

export class DOMCreate {
   buildEl(el: IEl): Element {
	  const element = document.createElement(el.which);                              
	  if(el.attrs) this.addAttributes(element, el.attrs);
	  if(el.text) this.addTextNode(element, el.text);

	  return element;
   }

   addChildren(context: Element, children: IEl[]) {
	  if(children) children.forEach((child: IEl) => {
		 const childEl = this.buildEl(child);
		 context.appendChild(childEl);

		 // TODO: write method to add children recursively
	  });
   }

   addAttributes(context: Element, attributes: IAttr[]) {
	   attributes.forEach((attr: IAttr) => {
		  if(attr) context.setAttribute(attr.attribute, attr.value);     
	   });
   }

   addTextNode(context: Element, text: string = "") {
	   const elTxt = document.createTextNode(text);
	   context.appendChild(elTxt);
   }
}
