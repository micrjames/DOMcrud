import "./styles/main.scss";
import { DOMcrud } from "./ts/DOMcrud";
import { container } from "./ts/incs";
import { test_elements_cfg } from "./ts/test_cfgs/element_cfgs";

const domCrud = new DOMcrud(container);
const elements_defn = test_elements_cfg;

domCrud.addEls(elements_defn, document);
