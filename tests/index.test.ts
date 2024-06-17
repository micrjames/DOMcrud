import { DOMcrud } from "../src/ts/DOMcrud";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');

describe("The DOM", () => {
   let domCrud: DOMcrud; 
   let dom: typeof JSDOM;
   let document: Document;
   let container: Element;
   beforeAll(() => {
	  const html = fs.readFileSync(path.resolve(__dirname, "..", 'src', 'template.html'), 'utf8');
	  dom = new JSDOM(html, {runScripts: 'dangerously'});
	  document = dom.window.document;
      const body = document.body;
	  container = body.firstElementChild;
	  domCrud = new DOMcrud(container);
   });
   describe("An element created within a page", () => {
	  describe("Existing in the page.", () => {
		 test.todo("Should not be undefined.");
		 test.todo("Should have the correct attributes not be undefined.");
		 test.todo("Should have children that are not undefined.");
		 test.todo("Should have a text node that is not undefined.");
	  });
	  describe("With internal structures defined", () => {
		 test.todo("Should be appended to the 'container' parent element.");
		 test.todo("Should have the correct attributes.");
		 test.todo("Should have children appended to the elements.");
		 test.todo("Should have a text node appended to the element.");
	  });
   });
   describe("Elements created within a page", () => {
	  describe("Should all exist in the page.", () => {
		 test.todo("Should all not be undefined.");
		 test.todo("Should all have the correct attributes not be undefined.");
		 test.todo("Should all have children that are not undefined.");
		 test.todo("Should all have a text node that is not undefined.");
	  });
	  describe("With internal structures defined", () => {
		 test.todo("Should all be appended to the 'container' parent element.");
		 test.todo("Should all have the correct attributes.");
		 test.todo("Should all have children appended to the elements.");
		 test.todo("Should all have a text node appended to the element.");
	  });
   });
});
