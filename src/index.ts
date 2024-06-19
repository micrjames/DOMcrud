import "./styles/main.scss";
import { DOMcrud } from "./ts/DOMcrud";
import { container } from "./ts/incs";
import { IEl } from "./ts/iters";

const domCrud = new DOMcrud(container);

const element: IEl = {
   which: "div",
};

domCrud.addEl(element, document);
