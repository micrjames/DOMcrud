export interface IAttr {
   name: string;
   value: string;
}

export interface IEl {
   which: string;
   attrs?: IAttr[];
   text?: string;
   children?: IEl[];
}

export interface IAttrObj {
   [prop: string]: string;
};
