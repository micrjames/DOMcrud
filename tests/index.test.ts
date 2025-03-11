import { DOMManager } from "../DOMManager";
import { JSDOM } from "jsdom";
import "@testing-library/jest-dom";

import fs from 'fs';
import path from 'path';

describe("DOM CRUD", () => {
	let dom: JSDOM;
	let document: Document;
	let body: HTMLBodyElement | null;
	let app: HTMLElement | null;
	let domManager: DOMManager;
    beforeAll(() => {
		const html = fs.readFileSync(path.resolve(__dirname, "..", 'index.html'), 'utf8');
		dom = new JSDOM(html, {runScripts: 'dangerously'});
		document = dom.window.document;
		domManager = new DOMManager(document);
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
			domManager.removeChildNodes(app);
		});
		describe("C", () => {
			let node: HTMLElement;
			beforeAll(() => {
				node = domManager.addNode('f1', 'hello');
			});
			test("Is present in the document.", () => {
				app.appendChild(node);
				expect(node).toBeInTheDocument();
			});
			test("has correct attributes.", () => {
				expect(node).toHaveAttribute("id", "f1");
				expect(node).toHaveTextContent("hello");
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
