import { NodeType } from "./utils";

// Creates a DOM node with ID and text for recipe/step management.

export const nodes: NodeType = {};

export function addNode(document: Document, id: string, data: string, tagName: string = 'div'): HTMLElement {
    if(!id || typeof id !== 'string' || id.trim() === '')
	   throw new Error('Invalid ID provided');
     
    const node = document.createElement(tagName);
	node.id = id;
	node.textContent = data ?? '';

	nodes[id] = node;

	return node;
}

export function updateNode(id: string, data: string): void {
    if(!id || typeof id !== 'string' || id.trim() === '')
	   throw new Error('Invalid ID provided');

    // We assume all element ID's are unique as per HTML standard
   // State tracks nodes for faster updates
    let targetNode: HTMLElement | null = null;
	targetNode = nodes[id];

	if(!targetNode) {
		const body: HTMLElement | null = document.body;
		if(body) {
			function searchElement(element: HTMLElement): boolean {
				if(element.id === id) {
					targetNode = element;
					return true;
				}
				const children: HTMLCollectionOf<HTMLElement> = element.children as HTMLCollectionOf<HTMLElement>;
				for(let child of children) {
					if(searchElement(child))
						return true;
				}
				return false;
			}

			searchElement(body);
		}
		throw new Error(`Node with ${id} not found`);
	}

	targetNode.textContent = data ?? '';
}

export function removeNode(id: string): void {
	const node = nodes[id];
	if (!node) throw new Error(`Node with id ${id} not found`);
	node.remove();
	delete nodes[id];
}

export function removeChildNodes(context: Element) {
	while(context.firstChild)
	   context.removeChild(context.lastChild as Element);
}
