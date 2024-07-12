import { IEl } from "./iters";

export class DOMCreate {
   buildEl(context: (Element | null), el: (IEl | undefined), document: Document): (Element | undefined) {
	  let element: (Element | undefined);
	  if(el) {
		 element = document.createElement(el.which);                              
		 if(document) {
			if(el.attrs) this.addAttributes(element, el.attrs);
			if(el.text) this.addTextNode(context, el.text, document);
		 }
	  }

	  return element;
   }

   addChildren(context: Element, children: (IEl | undefined)[], document: Document) {
	  if(children) {
		 children.forEach((child: (IEl | undefined)) => {
			const childEl = this.buildEl(context, child, document);
			if(childEl) context.appendChild(childEl);

			// TODO: write method to add children recursively
		 });
	  }
   }

   addAttributes(context: (Element | undefined), attributes: Attr[]) {
	   attributes.forEach((attr: Attr) => {
		  if(attr) context?.setAttribute(attr.name, attr.value);     
	   });
   }

   addTextNode(context: (Element | undefined | null), text: string = "", document: Document) {
	   const elTxt = document.createTextNode(text);
	   context?.appendChild(elTxt);
   }
}
