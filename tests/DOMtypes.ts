import { DOMcrud } from "../src/ts/DOMcrud";
import { IAttr, IEl } from "../src/ts/iters";

export interface DOMtypes {
   domCrud: DOMcrud; 
   element_defn: IEl;
   element: Element; 
   attrs: NamedNodeMap;
   elDefnAttrs: IAttr[];
}
