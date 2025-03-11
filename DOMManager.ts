import { NodeType, NodeId, isValidNodeId, NodeEntry } from "./utils";

/**
 * Manages DOM nodes with unique IDs and associated metadata.
 * Provides methods to create, update, remove, and query nodes in the DOM,
 * maintaining a record of each node's element, creation time, and parent.
 */
export class DOMManager {
	 /**
     * Internal record of managed nodes, keyed by unique IDs.
     * Each entry contains the node's HTMLElement, creation timestamp, and parent element.
     * @private
     */
    private nodes: Record<NodeId, NodeEntry>;
    private document: Document;

    constructor(document: Document) {
        this.nodes = {};
        this.document = document;
    }

	/**
     * Adds a new node to the DOM and tracks it in the manager.
     * The node is appended to the specified parent element and stored with metadata.
     * @param id - Unique identifier for the node (must be non-empty and trimmed).
     * @param data - Text content to set on the node.
     * @param tagName - HTML tag name for the node (defaults to "div").
     * @param parent - Parent element to append the node to (defaults to document.body).
     * @returns The created HTMLElement.
     * @throws {Error} If the ID is invalid (empty or whitespace-only).
     * @throws {Error} If a node with the same ID already exists.
     */
    addNode(id: string, data: string, tagName: string = "div", parent: Element = this.document.body): HTMLElement {
        if (!isValidNodeId(id)) {
            throw new Error(`Invalid ID: "${id}"`);
        }
        if (this.nodes[id]) {
            throw new Error(`Node with ID "${id}" already exists`);
        }
		if (!parent.isConnected) {
			throw new Error("Parent element is not connected to the DOM");
		}
        const node = this.document.createElement(tagName);
        node.id = id;
        node.textContent = data ?? "";
        const entry: NodeEntry = {
            element: node,
            createdAt: Date.now(),
            parent
        };
        this.nodes[id] = entry;
        parent.appendChild(node);
        return node;
    }

	/**
     * Updates the text content of an existing node.
     * @param id - The ID of the node to update.
     * @param data - New text content to set on the node.
     * @throws {Error} If the ID is invalid (empty or whitespace-only).
     * @throws {Error} If no node with the given ID exists.
     */
    updateNode(id: string, data: string): void {
        if (!isValidNodeId(id)) {
            throw new Error(`Invalid ID: "${id}"`);
        }
        if (!this.nodes[id]) {
            throw new Error(`Node not found: "${id}"`);
        }
        this.nodes[id].element.textContent = data ?? "";
    }

	/**
     * Removes a node from the DOM and the manager's record.
     * @param id - The ID of the node to remove.
     * @throws {Error} If the ID is invalid (empty or whitespace-only).
     * @throws {Error} If no node with the given ID exists.
     */	
    removeNode(id: string): void {
        if (!isValidNodeId(id)) {
            throw new Error(`Invalid ID: "${id}"`);
        }
        const entry = this.nodes[id];
        if (!entry) {
            throw new Error(`Node not found: "${id}"`);
        }
        entry.element.remove();
        delete this.nodes[id];
    }
	/**
     * Removes all child elements from a given context and updates the manager's record.
     * Only elements tracked by the manager (with matching IDs) are removed from the internal record.
     * @param context - The parent element whose children will be removed.
     */
    removeChildNodes(context: Element): void {
        const removedIds: string[] = [];
        while (context.lastElementChild) {
            const child = context.lastElementChild;
            if (child.id && this.nodes[child.id]) {
                removedIds.push(child.id);
            }
            context.removeChild(child);
        }
        removedIds.forEach(id => delete this.nodes[id]);
    }
	/**
     * Retrieves the creation timestamp of a node.
     * @param id - The ID of the node to query.
     * @returns The creation time (in milliseconds since epoch) or undefined if the node doesn’t exist.
     */
    getNodeCreationTime(id: NodeId): number | undefined {
        return this.nodes[id]?.createdAt;
    }

	 /**
     * Provides a readonly view of the managed nodes.
     * @returns A readonly record of all nodes and their metadata.
     */
    getNodes(): NodeType {
        return this.nodes as NodeType;
    }
}
