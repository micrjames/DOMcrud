import { IEl } from "./iters";
import { DOMCreate } from "./DOMcreate";

export class DOMcrud {
   private parentEl: (Element | null);
   private _domCreate: DOMCreate;

   constructor(context: (Element | null)) {
	  this.parentEl = context;
	  this._domCreate = new DOMCreate();
   }

   addEls(els: IEl[], document: Document) {
	  els.forEach(el => {
		 this.addEl(el, document);
	  });
   }
   
   addEl(el: IEl, document: Document) {
	  const element = this._domCreate.buildEl(el, document);
	  if(element) {
		 this.parentEl?.appendChild(element);
		 if(el.children) this._domCreate.addChildren(element, el.children, document);
	  }
   }

   get domCreate(): DOMCreate {
	  return this._domCreate;
   }
}
