export class DOMread {
    private structure: Node[] = [];
	out(document: Document): Node[] {
	   this.structure = [document, ...this.structure];
	   return this.structure;
    }	   
}
