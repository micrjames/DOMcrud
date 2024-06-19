import { IAttr, IEl } from "./iters";

export class DOMCreate {
   buildEl(el: (IEl | undefined), document: Document): (Element | undefined) {
	  let element;
	  if(el) {
		 element = document.createElement(el.which);                              
		 if(document) {
			if(el.attrs) this.addAttributes(element, el.attrs);
			if(el.text) this.addTextNode(element, el.text);
		 }
	  }

	  return element;
   }

   addChildren(context: Element, children: (IEl | undefined)[], document: Document) {
	  if(children) {
		 children.forEach((child: (IEl | undefined)) => {
			const childEl = this.buildEl(child, document);
			if(childEl) context.appendChild(childEl);

			// TODO: write method to add children recursively
		 });
	  }
   }

   addAttributes(context: (Element | undefined), attributes: IAttr[]) {
	   attributes.forEach((attr: IAttr) => {
		  if(attr) context?.setAttribute(attr.attribute, attr.value);     
	   });
   }

   addTextNode(context: (Element | undefined), text: string = "") {
	   const elTxt = document.createTextNode(text);
	   context?.appendChild(elTxt);
   }
}
