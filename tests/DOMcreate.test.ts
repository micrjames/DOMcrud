import { DOMcrud } from "../src/ts/DOMcrud";
import { DOMtypes } from "./DOMtypes";
import { IEl, IAttrObj } from "../src/ts/iters";
import { test_element_cfg, test_elements_cfg } from "./element_cfgs"
import { container, document } from "./incs";
import { Range } from "../../Range/Range";
import { Utils } from "../src/ts/utils";

describe("The DOM", () => {
   describe("An element created within a page", () => {
	  let domCrud: DOMcrud;
	  let rangeItNums: number[];
	  let element_defn: IEl;
	  let domTypes: DOMtypes;
	  let element: Element;
	  beforeAll(() => {
		 element_defn = test_element_cfg;
		 domCrud = new DOMcrud(container);
		 domCrud.addEl(element_defn, document);
		 element = container.firstElementChild,
		 domTypes = {
			attrs: element.attributes,
			elDefnAttrs: element_defn.attrs, 
			textNode: container.firstChild,
			children: element.children
		 };
		 rangeItNums = [...new Range(domTypes.attrs.length)];
	  });
	  describe("Existing in the page", () => {
		 test("Should be defined.", () => {
			expect(element).toBeDefined();
		 });
		 test("Should have attributes be defined.", () => {
			const attrsDoExist = element.hasAttributes();
			expect(attrsDoExist).toBeTruthy();
		 });
		 test("Should have as many attributes as defined in 'element_defn'.", () => {
			const nElDefnAttrs = domTypes.elDefnAttrs.length; 
		    expect(domTypes.attrs).toHaveLength(nElDefnAttrs); 
		 });
		 test("Should have children be defined.", () => {
			for(const child of domTypes.children) {
			   expect(child).toBeDefined();
			}
		 });
		 test("Should have as many children as defined in 'element_defn'.", () => {
			const nElDefnChildren = element_defn.children.length; 
			expect(domTypes.children).toHaveLength(nElDefnChildren);
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
			   attrObjs = Utils.attrToObjs(attrObjs, domTypes.attrs[idx]);
			});
			rangeItNums.forEach(idx => {
			   expect(attrObjs[idx]).toHaveProperty(
				  domTypes.elDefnAttrs[idx].name,
				  domTypes.elDefnAttrs[idx].value
			   );
			});
		 });
		 test("Should have the children appended to the element.", () => {
			for(const child of domTypes.children) {
			   const childIsConnected = child.isConnected;
			   expect(childIsConnected).toBeTruthy();
			}
		 });
		 test("Should have the children appended to the element as set in 'element_defn'.", () => {
			const children_defn = element_defn.children;
			let childAttrObjs: IAttrObj[] = [];
			rangeItNums.forEach(idx => {
			    childAttrObjs = Utils.attrToObjs(childAttrObjs, domTypes.children[idx].attributes[idx]);
			});
			rangeItNums.forEach(idx => {
			   const upperedWhichNode = children_defn[idx].which.toUpperCase();
			   expect(childAttrObjs[idx]).toHaveProperty(
				  children_defn[idx].attrs[idx].name,
				  children_defn[idx].attrs[idx].value
			   );
			   expect(domTypes.children[idx].nodeName).toBe(upperedWhichNode);
			});
		 });
		 test("Should have a text node appended to the container.", () => {
			const isTextNodeConnected = domTypes.textNode.isConnected;
			expect(isTextNodeConnected).toBeTruthy();
		 });
		 test("Should have a text node with the text defined in 'element_defn'.", () => {
			const textNodeText = domTypes.textNode.nextSibling.textContent;
			const elDefnText = element_defn.text;
			expect(textNodeText).toBe(elDefnText);
		 });
	  });
   });
   describe("Elements created within a page", () => {
	  let domCrud: DOMcrud; 
	  let element_defns: IEl[];
	  let elements: Element[]; 
	  let attrs: NamedNodeMap[];
	  let elDefnsAttrs: Attr[][];
	  let rangeItNums: number[];
	  let children: HTMLCollection[];
	  beforeAll(() => {
		 domCrud = new DOMcrud(container);
		 element_defns = test_elements_cfg;
		 domCrud.addEls(element_defns, document);
		 elements = Utils.enumChildren(container);
		 children = [];
		 
		 attrs = [];
		 for(const element of elements)
			attrs = [element.attributes, ...attrs];

		 elDefnsAttrs = [];
		 for(const element_defn of element_defns) {
			let edAttrs: Attr[] = [];
			for(const attrs of element_defn.attrs)
			   edAttrs = [attrs, ...edAttrs];
			elDefnsAttrs = [edAttrs, ...elDefnsAttrs];
		 }

		 rangeItNums = [...new Range(attrs.length)];

		 for(const element of elements)
			children = [element.children, ...children];
	  });
	  describe("All existing in the page.", () => {
		 test("Should all be defined.", () => {
			for(const element of elements)
			   expect(element).toBeDefined();
		 });
		 test("Should all have attributes be defined.", () => {
			for(const element of elements) {
			   const attrsDoExist = element.hasAttributes();
			   expect(attrsDoExist).toBeTruthy();
			}
		 });
		 test("Should have as many attributes as defined in 'element_defns'.", () => {
			const nElDefnsAttrs = elDefnsAttrs.length; 
			expect(attrs).toHaveLength(nElDefnsAttrs); 
		 });
		 test("Should have children be defined.", () => {
			for(const element of elements)
			   for(const child of element.children)
				  expect(child).toBeDefined();
		 });
		 test("Should have as many children as defined in each 'element_defn' of 'element_defns'.", () => {
			for(const element of elements)
			   for(const element_defn of element_defns) {
				  const nElDefnChildren = element_defn.children.length; 
				  expect(element.children).toHaveLength(nElDefnChildren);
			   }
	     });
		 test("Should have textnodes that are defined.", () => {
		 	for(const element of elements) {
			   const textNode = element.previousSibling;
			   expect(textNode).toBeDefined();
			}
		 });
	  });
	  describe("All with internal structures defined", () => {
		 test("Should all be appended to the 'container' parent element.", () => {
			for(const element of elements) {
			   const elementIsConnected = element.isConnected;
			   expect(elementIsConnected).toBeTruthy();
			}
		 });
		 test("Should all have the attributes set in 'element_defns'.", () => {
			let attrsObjs: IAttrObj[][] = [];
			for(const attr of attrs) {
			   let attrObjs: IAttrObj[] = [];
			   rangeItNums.forEach(idx => {
				  if(attr[idx]) {
					 attrObjs = Utils.attrToObjs(attrObjs, attr[idx]);
				  }
			   });
			   attrsObjs = [attrObjs, ...attrsObjs];
			}
			  
			for(const attrObjs of attrsObjs) 
			   for(const attrObj of attrObjs) {
				  for(const elDefnAttrs of elDefnsAttrs)
					 for(const attr of elDefnAttrs) {
						expect(attrObj).toHaveProperty(attr.name, attr.value);
					 }
			   }
		 });
		 test("Should all have the children appended to the elements.", () => {
			for(const element of elements) {
			   for(const child of element.children) {
				  const childIsConnected = child.isConnected;
				  expect(childIsConnected).toBeTruthy();
			   }
			}
		 });
		 test("Should all have the children appended to the element as set in 'element_defns'.", () => {
			let childAttrsObjs: IAttrObj[][] = [];
			for(const childrenColl of children) {
			   for(const child of childrenColl) {
				  let childAttrObjs: IAttrObj[] = [];
				  for(const attr of child.attributes)
					 childAttrObjs = Utils.attrToObjs(childAttrObjs, attr);
				  childAttrsObjs = [childAttrObjs, ...childAttrsObjs];
			   }
			}
			for(const childAttrObjs of childAttrsObjs)
			   for(const childAttrObj of childAttrObjs)
				  for(const elDefnAttrs of elDefnsAttrs)
					 for(const elDefnAttr of elDefnAttrs)
						expect(childAttrObj).toHaveProperty(elDefnAttr.name, elDefnAttr.value);
		 });
		 test("Should all have textnodes appended to the container.", () => {
			for(const element of elements) {
			   const textNode = element.previousSibling;
			   const isTextNodeConnected = textNode.isConnected;
			   expect(isTextNodeConnected).toBeTruthy();
			}
	     });
		 test("Should all have textnodes with the text defined in 'element_defns'.", () => {
			for(const element of elements) {
			   const textNode = element.previousSibling;
			   const textNodeText = textNode.textContent;

			   for(const element_defn of element_defns) {
				  const elDefnText = element_defn.text;
				  expect(textNodeText).toBe(elDefnText);
			   }
			}
		 });
	  });
   });
});
