// Creates a DOM node with ID and text for recipe/step management.

function addNode(id: string, data: string, tagName: string = 'div'): HTMLElement {
    if(!id || typeof id !== 'string' || id.trim() === '')
	   throw new Error('Invalid ID provided');
     
    const node = document.createElement(tagName);
	node.id = id;
	node.textContent = data ?? '';

	return node;
}
