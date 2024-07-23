export interface DOMtype {
   attrs: NamedNodeMap;
   elDefnAttrs: Attr[];
   children: HTMLCollection;
   textNode: Node;
}

export type DOMtypes = {
   [key in keyof DOMtype]: Array<DOMtype[key]>;
};
