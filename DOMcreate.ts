// Creates a DOM node with ID and text for recipe/step management.

function addNode(id: string, data: string): HTMLElement {
    const node = document.createElement('div');
	node.id = id;
	node.innerText = data;

	return node;
}
