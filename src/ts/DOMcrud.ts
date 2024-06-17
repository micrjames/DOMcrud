import { IEl } from "./iters";
import { DOMCreate } from "./DOMcreate";

export class DOMcrud {
   private parentEl: Element;
   private domCreate: DOMCreate;

   constructor(context: Element) {
	  this.parentEl = context;
	  this.domCreate = new DOMCreate();
   }

   addEls(els: IEl[]) {
	  els.forEach(el => {
		 this.addEl(el);
	  });
   }
   
   addEl(el: IEl) {
	  const element = this.domCreate.buildEl(el);
	  this.parentEl.appendChild(element);
	  this.domCreate.addChildren(element, el.children);
   }
}
