import { IAttr } from "../src/ts/iters";

export interface DOMtypes {
   attrs: NamedNodeMap;
   elDefnAttrs: IAttr[];
   children: HTMLCollection;
   textNode: Node;
}
