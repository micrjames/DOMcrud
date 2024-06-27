import { DOMcrud } from "../src/ts/DOMcrud";
import { IEl } from "../src/ts/iters";
import { test_element_cfg } from "./element_cfg"
import { container, document } from "./incs";

describe("The DOM", () => {
   let domCrud: DOMcrud; 
   let element_defn: IEl;
   let element: Element; 
   beforeAll(() => {
	  domCrud = new DOMcrud(container);
   });
   describe("An element created within a page", () => {
	  describe("Existing in the page.", () => {
		 beforeAll(() => {
			element_defn = test_element_cfg; 
			domCrud.addEl(element_defn, document);
			element = container.firstElementChild;
		 });
		 test("Should be defined.", () => {
			expect(element).toBeDefined();
		 });
		 test("Should have attributes be defined.", () => {
			const attrsDoExist = element.hasAttributes();
			expect(attrsDoExist).toBeTruthy();
		 });
		 test("Should have as many attributes as defined in 'element_defn'.", () => {
			const attrs = element.attributes;
			const nElDefnAttrs = element_defn.attrs.length; 
		    expect(attrs).toHaveLength(nElDefnAttrs); 
		 });
		 test("Should have children be defined.", () => {
			for(const child of element.children) {
			   expect(child).toBeDefined();
			}
		 });
		 test("Should have as many children as defined in 'element_defn'.", () => {
			const children = element.children;
			const nElDefnChildren = element_defn.children.length; 
			expect(children).toHaveLength(nElDefnChildren);
		 });
		 test("Should have a text node that is defined.", () => {
			const textNode = container.firstChild;
			expect(textNode).toBeDefined();
		 });
	  });
	  describe("With internal structures defined", () => {
		 test.todo("Should be appended to the 'container' parent element.");
		 test.todo("Should have the attributes set in 'element_defn'.");
		 test.todo("Should have the children appended to the element.");
		 test.todo("Should have the children appended to the element as set in 'element_defn'.");
		 test.todo("Should have a text node appended to the element.");
		 test.todo("Should have a text node with the text defined in 'element_defn'.");
	  });
   });
   describe("Elements created within a page", () => {
	  describe("All existing in the page.", () => {
		 test.todo("Should all be defined.");
		 test.todo("Should all have attributes be defined.");
		 test.todo("Should have as many attributes as defined in 'element_defn'.");
		 test.todo("Should have children be defined.");
		 test.todo("Should have as many children as defined in 'element_defn'.");
		 test.todo("Should have a text node that is defined.");
	  });
	  describe("All with internal structures defined", () => {
		 test.todo("Should all be appended to the 'container' parent element.");
		 test.todo("Should all have the attributes set in 'element_defn'.");
		 test.todo("Should all have the children appended to the element.");
		 test.todo("Should all have the children appended to the element as set in 'element_defn'.");
		 test.todo("Should all have a text node appended to the element.");
		 test.todo("Should all have a text node with the text defined in 'element_defn'.");
	  });
   });
});
