export interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: string;
}

export interface NodeLink extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

export type Data = {
  nodes: Node[];
  links: NodeLink[];
};

export const data = {
  nodes: [
    { id: "Myriel", group: 1 },
    { id: "Napoleon", group: 1 },
    { id: "Mlle.Baptistine", group: 1 },
    { id: "Mme.Magloire", group: 1 },
  ],
  links: [
    { source: "Napoleon", target: "Myriel", value: 1 },
    { source: "Mlle.Baptistine", target: "Myriel", value: 1 },
    { source: "Mme.Magloire", target: "Myriel", value: 1 },
  ],
};
