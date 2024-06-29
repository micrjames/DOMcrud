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
}
