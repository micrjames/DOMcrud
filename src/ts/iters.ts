export interface IAttr {
   attribute: string;
   value: string;
}

export interface IEl {
   which: string;
   attrs?: IAttr[];
   text?: string;
   children?: IEl[];
}
