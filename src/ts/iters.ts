export interface IEl {
   which: string;
   attrs?: Attr[];
   text?: string;
   children?: IEl[];
}

export interface IAttrObj {
   [prop: string]: string;
};
