import { DOMcrud } from "../src/ts/DOMcrud";
import { container, document } from "./incs";
import { DOMtype } from "./DOMtypes";
import { IEl } from "../src/ts/iters";
import { test_element_cfg } from "./element_cfgs"

describe("The DOM", () => {
   describe("An element created within a page", () => {
	  let domCrud: DOMcrud;
	  let element_defn: IEl;
	  let domType: DOMtype;
	  let element: Element;
	  beforeAll(() => {
		 domCrud = new DOMcrud(container);
		 element_defn = test_element_cfg;
		 domCrud.addEl(element_defn, document);
		 element = container.firstElementChild;
		 domType = {
			attrs: element.attributes,
			elDefnAttrs: element_defn.attrs, 
			textNode: container.firstChild,
			children: element.children
		 };
		 console.log(domCrud.out(document)[0]);
	  });
	  describe("Existing within the page", () => {
		 test.todo("Should be read as existing from the page.");
		 test.todo("Should read the attributes as existing.");
		 test.todo("Should read any children as existing.");
		 test.todo("Should read the textnode as existing.");
	  });
	  describe("Read from the page", () => {
		 test.todo("Should be listed from the page.");
		 test.todo("Should list the attributes.");
		 test.todo("Should list any children.");
		 test.todo("Should read the textnode as existing.");
	  });
   });
   describe("Elements created within a page", () => {
	  let domCrud: DOMcrud;
	  beforeAll(() => {
		 domCrud = new DOMcrud(container);
	  });
	  describe("All existing within the page", () => {
		 test.todo("Should all be read as existing from the page.");
		 test.todo("Should read all the attributes as existing.");
		 test.todo("Should read all children as existing.");
		 test.todo("Should read all textnodes as existing.");
	  });
	  describe("All read from the page", () => {
		 test.todo("Should all be listed from the page.");
		 test.todo("Should list all the attributes.");
		 test.todo("Should list all children.");
		 test.todo("Should list all textnodes.");
	  });
   });
});
