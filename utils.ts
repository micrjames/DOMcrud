// utils.ts
export type NodeId = string & { __brand: "NodeId" };

export function isValidNodeId(id: string): id is NodeId {
    return id !== "" && typeof id === "string" && id.trim() !== "";
}

export interface NodeEntry {
    element: HTMLElement;
    createdAt: number;
    parent: Element;
}

export type NodeType = Readonly<Record<NodeId, NodeEntry>>;
