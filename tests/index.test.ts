import { nodes, addNode, updateNode, removeNode, removeChildNodes } from "../DOMcrud";
import { JSDOM } from "jsdom";
import "@testing-library/jest-dom";

import fs from 'fs';
import path from 'path';

describe("DOM CRUD", () => {
	let dom: JSDOM;
	let document: Document;
	let body: HTMLBodyElement | null;
	let app: HTMLElement | null;
    beforeAll(() => {
		const html = fs.readFileSync(path.resolve(__dirname, "..", 'index.html'), 'utf8');
		dom = new JSDOM(html, {runScripts: 'dangerously'});
		document = dom.window.document;
		body = document.body as HTMLBodyElement;
		if (!body) {
			throw new Error("Document body is missing");
		}
		app = body.firstElementChild instanceof dom.window.HTMLElement ? body.firstElementChild : null;
		if(!app)
			throw new Error("No app element found as first child of body.");
    });
    describe("CD", () => {
		beforeEach(() => {
			removeChildNodes(app);
			Object.keys(nodes).forEach(id => delete nodes[id]);
		});
		describe("C", () => {
			let f1: HTMLElement;
			beforeAll(() => {
				f1 = addNode(document, 'f1', 'hello');
			});
			test("Is present in the document.", () => {
				app.appendChild(f1);
				expect(f1).toBeInTheDocument();
			});
			test("has correct attributes.", () => {
				expect(f1).toHaveAttribute("id", "f1");
				expect(f1).toHaveTextContent("hello");
			});
		});
		test.todo("Removes a node.");
    });
    describe("Update", () => {
		beforeEach(() => {
		});
	    test.todo("Updates a node.");
	    test.todo("Throws error for invalid ID");
    });
});
