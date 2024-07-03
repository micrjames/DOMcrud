import { IAttrObj } from "./iters";

export class Utils {
   static attrToObj(attr: Attr): IAttrObj {
	  let attrObj: IAttrObj = {};
	  attrObj = {
		 [attr.name]: attr.value 
	  };

	  return attrObj;
   }

   static attrToObjs(arr: IAttrObj[], attr: Attr): IAttrObj[] {
	  return [
		 Utils.attrToObj(attr)
	  , ...arr];
   }

   static enumChildren(context: Element): (Element | null | undefined)[] {
	  let elements: (Element | null | undefined)[] = [];
	  let elChild: (Element | null | undefined); 

	  elChild = context.firstElementChild;

	  do {
		 elements = [elChild, ...elements];
		 elChild = elChild?.nextElementSibling;
	  } while(elChild !== context.lastChild);

	  return elements;
   }
}
