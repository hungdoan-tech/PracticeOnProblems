import fs from "fs";

const Graph = function () {
  const nodes = {};
  const nodeIndex = {};
  const edgeIndex = {};

  this.addNode = function (id, data = {}) {
    if (nodes[id]) {
      throw new Error(`Node ${id} already exists in the graph.`);
    }
    nodes[id] = { id, data, edges: {} };
    nodeIndex[id] = nodes[id];
  };

  this.getNode = function (id) {
    return nodeIndex[id];
  };

  this.addEdge = function (fromNodeId, toNodeId, weight = 1) {
    const fromNode = nodes[fromNodeId];
    const toNode = nodes[toNodeId];

    if (!fromNode || !toNode) {
      throw new Error(
        `Nodes ${fromNodeId} and ${toNodeId} must exist in the graph.`
      );
    }

    if (fromNode.edges[toNodeId]) {
      throw new Error(`Edge from ${fromNodeId} to ${toNodeId} already exists.`);
    }

    fromNode.edges[toNodeId] = weight;
    edgeIndex[`${fromNodeId}-${toNodeId}`] = weight;
  };

  this.getNeighbors = function (id) {
    const node = nodes[id];
    if (!node) {
      throw new Error(`Node ${id} does not exist in the graph.`);
    }
    return Object.keys(node.edges);
  };

  this.removeNode = function (id) {
    if (!nodes[id]) {
      throw new Error(`Node ${id} does not exist in the graph.`);
    }
    delete nodes[id];
    delete nodeIndex[id];
    for (const nodeId in nodes) {
      if (nodes[nodeId].edges[id]) {
        delete nodes[nodeId].edges[id];
        delete edgeIndex[`${nodeId}-${id}`];
      }
    }
  };

  this.removeEdge = function (fromNodeId, toNodeId) {
    const fromNode = nodes[fromNodeId];
    if (!fromNode || !fromNode.edges[toNodeId]) {
      throw new Error(`Edge from ${fromNodeId} to ${toNodeId} does not exist.`);
    }
    delete fromNode.edges[toNodeId];
    delete edgeIndex[`${fromNodeId}-${toNodeId}`];
  };

  // should implement a recursive parser -> ast -> gen useful meaning code
  // the current version is just for simple presentation purpose
  this.query = function (queryString) {
    const tokens = queryString.split(" ");

    if (tokens[0] === "FIND" && tokens[1] === "NODE") {
      const nodeId = tokens[2];
      return this.getNode(nodeId);
    } else if (
      tokens[0] === "FIND" &&
      tokens[1] === "EDGE" &&
      tokens[3] === "TO"
    ) {
      const fromNodeId = tokens[2];
      const toNodeId = tokens[4];
      return nodes[fromNodeId].edges[toNodeId];
    } else if (
      tokens[0] === "FIND" &&
      tokens[1] === "PATH" &&
      tokens[3] === "TO"
    ) {
      const fromNodeId = tokens[2];
      const toNodeId = tokens[4];

      const visited = new Set();
      const queue = [[fromNodeId]];
      while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];
        if (node === toNodeId) {
          return path;
        }
        if (!visited.has(node)) {
          visited.add(node);
          for (const neighbor of Object.keys(nodes[node].edges)) {
            queue.push([...path, neighbor]);
          }
        }
      }
      return null;
    } else {
      throw new Error("Invalid query.");
    }
  };

  this.saveToFile = function (filePath) {
    const data = {
      nodes,
      nodeIndex,
      edgeIndex,
    };
    fs.writeFileSync(filePath, JSON.stringify(data));
  };

  this.loadFromFile = function (filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    Object.assign(nodes, data.nodes);
    Object.assign(nodeIndex, data.nodeIndex);
    Object.assign(edgeIndex, data.edgeIndex);
  };
};

const graph = new Graph();
graph.addNode("A", { value: 123 });
graph.addNode("B", { value: 456 });
graph.addEdge("A", "B");
console.log(graph.getNode("A")); // Output: { id: 'A', data: { value: 123 }, edges: { B: 1 } }
console.log(graph.edgeIndex); // Output: { 'A-B': 1 }

graph.saveToFile("graph.json");

const newGraph = new Graph();
newGraph.loadFromFile("graph.json");
console.log(newGraph.getNode("A"));

console.log(graph.query("FIND NODE A")); // Output: { id: 'A', data: {}, edges: { B: 1 } }
console.log(graph.query("FIND EDGE A TO B")); // Output: 1
console.log(graph.query("FIND PATH A TO B")); // Output: ['A', 'B']
