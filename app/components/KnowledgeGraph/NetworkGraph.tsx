import * as d3 from "d3";
import { Node, NodeLink } from "./data";
import { Simulation, SimulationNodeDatum, DragBehavior } from "d3";

export default function Graph(
  { nodes, links }: { nodes: Node[]; links: NodeLink[] },
  {
    nodeId = (d) => d.id,
    nodeGroup = (d) => d.group,
    nodeGroups = [],
    nodeTitle = (d) => d.id,
    nodeFill = "currentColor",
    nodeStroke = "#fff",
    nodeStrokeWidth = 1.5,
    nodeStrokeOpacity = 1,
    nodeRadius = 15,
    nodeStrength = -500,
    linkSource = ({ source }) => source,
    linkTarget = ({ target }) => target,
    linkStroke = "#999",
    linkStrokeOpacity = 0.6,
    linkStrokeWidth = 1.5,
    linkStrokeLinecap = "round",
    linkStrength = 0.5,
    colors = d3.schemeTableau10.slice(),
    width = 640,
    height = 400,
    invalidation,
  }: {
    nodeId: (d: any) => string;
    nodeGroup: (d: any) => string;
    nodeGroups: any[];
    nodeTitle: (d: any) => string;
    nodeFill: string;
    nodeStroke: string;
    nodeStrokeWidth: number;
    nodeStrokeOpacity: number;
    nodeRadius: number;
    nodeStrength: number;
    linkSource: ({ source }: { source: any }) => any;
    linkTarget: ({ target }: { target: any }) => any;
    linkStroke: string | Function;
    linkStrokeOpacity: number;
    linkStrokeWidth: number | Function;
    linkStrokeLinecap: string;
    linkStrength: number;
    colors: string[];
    width: number;
    height: number;
    invalidation?: Promise<void>;
  }
) {
  const N = d3.map(nodes, nodeId).map(intern);
  const LS = d3.map(links, linkSource).map(intern);
  const LT = d3.map(links, linkTarget).map(intern);
  if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
  const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
  const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
  const W =
    typeof linkStrokeWidth !== "function"
      ? null
      : d3.map(links, linkStrokeWidth as any);
  const L =
    typeof linkStroke !== "function" ? null : d3.map(links, linkStroke as any);

  const internalNodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
  const internalLinks = d3.map(links, (_, i) => ({
    source: LS[i],
    target: LT[i],
  }));

  if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

  const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

  const forceNode = d3.forceManyBody();
  const forceLink = d3.forceLink(internalLinks).id(({ index: i }) => N[i]);
  if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
  if (linkStrength !== undefined) forceLink.strength(linkStrength);

  const simulation = d3
    .forceSimulation(internalNodes)
    .force("link", forceLink)
    .force("charge", forceNode)
    .force("center", d3.forceCenter());

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const link = svg
    .append("g")
    .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
    .attr("stroke-opacity", linkStrokeOpacity)
    .attr(
      "stroke-width",
      typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
    )
    .attr("stroke-linecap", linkStrokeLinecap)
    .selectAll("line")
    .data(internalLinks)
    .join("line");

  const node = svg
    .append("g")
    .attr("fill", nodeFill)
    .attr("stroke", nodeStroke)
    .attr("stroke-opacity", nodeStrokeOpacity)
    .attr("stroke-width", nodeStrokeWidth)
    .selectAll("circle")
    .data(internalNodes)
    .join("circle")
    .attr("r", nodeRadius)
    .call(drag(simulation));

  const label = svg
    .selectAll(".label")
    .data(internalNodes)
    .enter()
    .append("text")
    .text(nodeTitle)
    .style("text-anchor", "middle")
    .style("fill", "#555")
    .style("font-family", "Arial")
    .style("font-size", 12)
    .style("visibility", "hidden"); // Initially hide all labels

  let selectedNode: any = null;

  node
    .on("mouseover", function (_, d) {
      label.filter((ld) => ld === d).style("visibility", "visible");
      link.style("stroke", (l: any): string => {
        if (d === l.source || d === l.target) {
          return "red";
        }
        return nodeStroke;
      });
    })
    .on("mouseout", function (_, d) {
      if (selectedNode !== d) {
        label.filter((ld) => ld === d).style("visibility", "hidden");
      }
    })
    .on("click", function (_, d) {
      if (selectedNode !== d) {
        if (selectedNode) {
          label
            .filter((ld) => ld === selectedNode)
            .style("visibility", "hidden");
        }
        selectedNode = d;
        label.filter((ld) => ld === d).style("visibility", "visible");
      } else {
        label.filter((ld) => ld === d).style("visibility", "hidden");
        selectedNode = null;
      }
    });

  node.on("mouseover", function (_, d) {});

  if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
  if (L) link.attr("stroke", ({ index: i }) => L[i]);
  if (G) node.attr("fill", ({ index: i }) => color(G[i]));
  if (T) node.append("title").text(({ index: i }) => T[i]);
  if (invalidation != null) invalidation.then(() => simulation.stop());

  simulation.on("tick", ticked);

  function intern(value: any) {
    return value !== null && typeof value === "object"
      ? value.valueOf()
      : value;
  }

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    label.attr("x", (d) => d.x).attr("y", (d) => d.y - 20);
  }

  function drag(
    simulation: Simulation<SimulationNodeDatum, undefined>
  ): DragBehavior<Element, unknown, unknown> {
    function dragstart(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragend(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstart)
      .on("drag", dragged)
      .on("end", dragend);
  }

  return Object.assign(svg.node(), { scales: { color } });
}
