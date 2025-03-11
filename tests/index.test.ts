import { DOMManager } from "../DOMManager";
import { JSDOM } from "jsdom";
import "@testing-library/jest-dom";
import { NodeId } from "../utils"; // Import NodeId for type safety
import fs from "fs";
import path from "path";

describe("DOMManager", () => {
    let dom: JSDOM;
    let document: Document;
    let body: HTMLBodyElement;
    let app: HTMLElement;
    let domManager: DOMManager;

    beforeAll(() => {
        const html = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf8");
        dom = new JSDOM(html, { runScripts: "dangerously" });
        document = dom.window.document;
        body = document.body as HTMLBodyElement;
        if (!body) {
            throw new Error("Document body is missing");
        }
        app = body.firstElementChild instanceof dom.window.HTMLElement ? (body.firstElementChild as HTMLElement) : null;
        if (!app) {
            throw new Error("No app element found as first child of body.");
        }
    });

    beforeEach(() => {
        domManager = new DOMManager(document);
		domManager.removeChildNodes(body);
		body.appendChild(app);
        domManager.removeChildNodes(app); // Reset app children before each test
    });

    describe("addNode", () => {
        test("creates a node with metadata", () => {
            const node = domManager.addNode("f1", "hello", "div", app);
            expect(node).toBeInTheDocument();
            expect(node).toHaveAttribute("id", "f1");
            expect(node).toHaveTextContent("hello");
            expect(domManager.getNodeCreationTime("f1" as NodeId)).toBeGreaterThan(0);
        });

        test("throws error for invalid ID", () => {
            expect(() => domManager.addNode("", "data")).toThrow("Invalid ID: \"\"");
            expect(() => domManager.addNode("  ", "data")).toThrow("Invalid ID: \"  \"");
        });

        test("throws error for duplicate ID", () => {
            domManager.addNode("f1", "hello", "div", app);
            expect(() => domManager.addNode("f1", "duplicate")).toThrow("Node with ID \"f1\" already exists");
        });

        test("throws error for detached parent", () => {
            const detached = document.createElement("div");
            expect(() => domManager.addNode("f1", "data", "div", detached)).toThrow(
                "Parent element is not connected to the DOM"
            );
        });
    });

    describe("updateNode", () => {
        test("updates node text content", () => {
            const node = domManager.addNode("f1", "hello", "div", app);
            domManager.updateNode("f1", "updated");
            expect(node).toHaveTextContent("updated");
        });

        test("throws error for invalid ID", () => {
            expect(() => domManager.updateNode("", "data")).toThrow("Invalid ID: \"\"");
        });

        test("throws error for non-existent node", () => {
            expect(() => domManager.updateNode("f1", "data")).toThrow("Node not found: \"f1\"");
        });
    });

    describe("removeNode", () => {
        test("removes a node from DOM and manager", () => {
            domManager.addNode("f1", "hello", "div", app);
            domManager.removeNode("f1");
            expect(document.getElementById("f1")).not.toBeInTheDocument();
            expect(domManager.getNodeCreationTime("f1" as NodeId)).toBeUndefined();
        });

        test("throws error for invalid ID", () => {
            expect(() => domManager.removeNode("")).toThrow("Invalid ID: \"\"");
        });

        test("throws error for non-existent node", () => {
            expect(() => domManager.removeNode("f1")).toThrow("Node not found: \"f1\"");
        });
    });

    describe("removeChildNodes", () => {
        test("removes all child nodes and updates manager", () => {
            const node1 = domManager.addNode("f1", "hello", "div", app);
            const node2 = domManager.addNode("f2", "world", "div", app);
            domManager.removeChildNodes(app);
            expect(app.children.length).toBe(0);
            expect(domManager.getNodeCreationTime("f1" as NodeId)).toBeUndefined();
            expect(domManager.getNodeCreationTime("f2" as NodeId)).toBeUndefined();
        });

        test("leaves unrelated nodes in manager", () => {
            domManager.addNode("f1", "hello", "div", app);
            domManager.addNode("f2", "world", "div", body); // Use body as a connected parent
            domManager.removeChildNodes(app);
            expect(document.getElementById("f1")).not.toBeInTheDocument();
            expect(domManager.getNodeCreationTime("f1" as NodeId)).toBeUndefined();
            expect(domManager.getNodeCreationTime("f2" as NodeId)).toBeGreaterThan(0);
            expect(document.getElementById("f2")).toBeInTheDocument();
        });

        test("handles empty context", () => {
            domManager.removeChildNodes(app);
            expect(app.children.length).toBe(0);
        });
    });

    describe("getNodeCreationTime", () => {
        test("returns creation time for existing node", () => {
            domManager.addNode("f1", "hello", "div", app);
            const time = domManager.getNodeCreationTime("f1" as NodeId);
            expect(time).toBeGreaterThan(0);
            expect(time).toBeLessThanOrEqual(Date.now());
        });

        test("returns undefined for non-existent node", () => {
            expect(domManager.getNodeCreationTime("f1" as NodeId)).toBeUndefined();
        });
    });

    describe("getNodes", () => {
        test("returns readonly view of nodes", () => {
            domManager.addNode("f1", "hello", "div", app);
            const nodes = domManager.getNodes();
            expect(nodes["f1"].element).toBeInTheDocument();
            expect(nodes["f1"].createdAt).toBeGreaterThan(0);
            expect(nodes["f1"].parent).toBe(app);
        });

        test("returns empty object when no nodes exist", () => {
            const nodes = domManager.getNodes();
            expect(Object.keys(nodes).length).toBe(0);
        });
    });
});                                                                                                           
