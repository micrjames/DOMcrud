import { IEl } from "./iters";
import { DOMCreate } from "./DOMcreate";
import { DOMread } from "./DOMread";

export class DOMcrud {
   private parentEl: (Element | null);
   private _domCreate: DOMCreate;
   private _domRead: DOMread;

   constructor(context: (Element | null)) {
	  this.parentEl = context;
	  this._domCreate = new DOMCreate();
	  this._domRead = new DOMread();
   }

   addEls(els: IEl[], document: Document) {
	  els.forEach(el => {
		 this.addEl(el, document);
	  });
   }
   
   addEl(el: IEl, document: Document) {
	  const element = this._domCreate.buildEl(this.parentEl, el, document);
	  if(element) {
		 this.parentEl?.appendChild(element);
		 if(el.children) this._domCreate.addChildren(element, el.children, document);
	  }
   }

   out(document: Document): Node[] {
	  return this._domRead.out(document);
   }
}
