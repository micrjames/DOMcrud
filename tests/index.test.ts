import { DOMcrud } from "../src/ts/DOMcrud";
import { IAttr, IEl, IAttrObj } from "../src/ts/iters";
import { test_element_cfg } from "./element_cfg"
import { container, document } from "./incs";
import { Range } from "../../Range/Range";
import { Utils } from "../src/ts/utils";

describe("The DOM", () => {
   describe("An element created within a page", () => {
	  let domCrud: DOMcrud; 
	  let element_defn: IEl;
	  let element: Element; 
	  let attrs: NamedNodeMap;
	  let elDefnAttrs: IAttr[];
	  let children: HTMLCollection;
	  let rangeItNums: number[];
	  let textNode: Node;
	  beforeAll(() => {
		 domCrud = new DOMcrud(container);
		 element_defn = test_element_cfg; 
		 domCrud.addEl(element_defn, document);
		 element = container.firstElementChild;
		 textNode = container.firstChild;
		 attrs = element.attributes;
		 elDefnAttrs = element_defn.attrs; 
		 children = element.children;
		 rangeItNums = [...new Range(attrs.length)];
	  });
	  describe("Existing in the page.", () => {
		 test("Should be defined.", () => {
			expect(element).toBeDefined();
		 });
		 test("Should have attributes be defined.", () => {
			const attrsDoExist = element.hasAttributes();
			expect(attrsDoExist).toBeTruthy();
		 });
		 test("Should have as many attributes as defined in 'element_defn'.", () => {
			const nElDefnAttrs = elDefnAttrs.length; 
		    expect(attrs).toHaveLength(nElDefnAttrs); 
		 });
		 test("Should have children be defined.", () => {
			for(const child of element.children) {
			   expect(child).toBeDefined();
			}
		 });
		 test("Should have as many children as defined in 'element_defn'.", () => {
			const nElDefnChildren = element_defn.children.length; 
			expect(children).toHaveLength(nElDefnChildren);
		 });
		 test("Should have a text node that is defined.", () => {
			const textNode = container.firstChild;
			expect(textNode).toBeDefined();
		 });
	  });
	  describe("With internal structures defined", () => {
		 test("Should be appended to the 'container' parent element.", () => {
			const elementIsConnected = element.isConnected;
			expect(elementIsConnected).toBeTruthy();
		 });
		 test("Should have the attributes set in 'element_defn'.", () => {
			let attrObjs: IAttrObj[] = [];
			rangeItNums.forEach(idx => {
			   attrObjs = Utils.attrToObjs(attrObjs, attrs[idx]);
			});
			rangeItNums.forEach(idx => {
			   expect(attrObjs[idx]).toHaveProperty(elDefnAttrs[idx].name, elDefnAttrs[idx].value);
			});
		 });
		 test("Should have the children appended to the element.", () => {
			for(const child of children) {
			   expect(element).toStrictEqual(child.parentElement);
			}
		 });
		 test("Should have the children appended to the element as set in 'element_defn'.", () => {
			const children_defn = element_defn.children;
			let childAttrObjs: IAttrObj[] = [];
			rangeItNums.forEach(idx => {
			    childAttrObjs = Utils.attrToObjs(childAttrObjs, children[idx].attributes[idx])
			});
			rangeItNums.forEach(idx => {
			   const upperedWhichNode = children_defn[idx].which.toUpperCase();
			   expect(childAttrObjs[idx]).toHaveProperty(children_defn[idx].attrs[idx].name, children_defn[idx].attrs[idx].value);
			   expect(children[idx].nodeName).toBe(upperedWhichNode);
			});
		 });
		 test("Should have a text node appended to the container.", () => {
			const isTextNodeConnected = textNode.isConnected;
			expect(isTextNodeConnected).toBeTruthy();
		 });
		 test("Should have a text node with the text defined in 'element_defn'.", () => {
			const textNodeText = textNode.nextSibling.textContent;
			const elDefnText = element_defn.text;
			expect(textNodeText).toBe(elDefnText);
		 });
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
		 test.todo("Should all have a text node appended to the container.");
		 test.todo("Should all have a text node with the text defined in 'element_defn'.");
	  });
   });
});
