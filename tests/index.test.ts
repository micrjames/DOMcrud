import { addNode, updateNode, removeNode, removeChildNodes } from "../DOMcrud";
import { JSDOM } from "jsdom";
require('@testing-library/jest-dom');

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
		});
	    test.todo("Creates a node.");
	    test.todo("Removes a node.");
    });
    describe("Update", () => {
		beforeEach(() => {
		});
	    test.todo("Updates a node.");
	    test.todo("Throws error for invalid ID");
    });
});
