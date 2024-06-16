import { IAttr, IEl } from "./iters";

export class DOMcrud {
   private parentEl: Element;

   constructor(context: Element) {
	  this.parentEl = context;
   }

   addEls(els: IEl[]) {
	  els.forEach(el => {
		 this.addEl(el);
	  });
   }
   
   addEl(el: IEl) {
	  const element = this.buildEl(el);
	  this.parentEl.appendChild(element);
	  if(el.children) el.children.forEach((child: IEl) => {
		 const childEl = this.buildEl(child);
		 element.appendChild(childEl);

		 // TODO: write method to add children recursively
	  });
   }

   private buildEl(el: IEl): Element {
	  const element = document.createElement(el.which);                              
	  if(el.attrs) this.addAttributes(element, el.attrs);
	  if(el.text) this.addTextNode(element, el.text);

	  return element;
   }

   private addAttributes(context: Element, attributes: IAttr[]) {
	   attributes.forEach((attr: IAttr) => {
		  if(attr) context.setAttribute(attr.attribute, attr.value);     
	   });
   }

   private addTextNode(context: Element, text: string = "") {
	   const elTxt = document.createTextNode(text);
	   context.appendChild(elTxt);
   }
}
