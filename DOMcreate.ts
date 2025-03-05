// Creates a DOM node with ID and text for recipe/step management.

function addNode(id: string, data: string, tagName: string = 'div'): HTMLElement {
    if(!id || typeof id !== 'string' || id.trim() === '')
	   throw new Error('Invalid ID provided');
     
    const node = document.createElement(tagName);
	node.id = id;
	node.textContent = data ?? '';

	return node;
}

function updateNode(id: string, data: string): void {
    if(!id || typeof id !== 'string' || id.trim() === '')
	   throw new Error('Invalid ID provided');

    // We assume all element ID's are unique as per HTML standard
    let targetNode: HTMLElement | null = null;
	const body: HTMLElement | null = document.body;

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

	if(body) searchElement(body);
	if(!targetNode) throw new Error(`Node with ${id} not found`);

	targetNode.textContent = data ?? '';
}
