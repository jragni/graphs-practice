/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    vertexArray.forEach((ele) => this.nodes.add(ele));
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    if (v1.adjacent.has(v2)) v1.adjacent.delete(v2);
    if (v2.adjacent.has(v1)) v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) this.nodes.delete(vertex);
    // TODO: update removing all adjacency lists with this vertex
    // using BFS or DFS
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let visited = new Set();
    let nodes = [start.value];

    function _dfsHelper(node) {
      if (!visited.has(node)) {
        visited.add(node);
        for (let n of node.adjacent) {
          if (!visited.has(n)) nodes.push(n.value);
          _dfsHelper(n);
        }
      }
    }
    _dfsHelper(start);
    return nodes;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    const queue = [start]; // would implement a queue with LinkedList if needed
    const visited = new Set();

    function _bfsHelper(node) {
      if (!node || queue.length === 0) return;

      for (let n of node.adjacent) {
        if (!visited.has(n.value) && !queue.includes(n)) {
          queue.push(n);
        }
      }
      let currNode = queue.shift();
      visited.add(currNode.value);
      _bfsHelper(queue[0]);
    }

    _bfsHelper(start);
    return Array.from(visited);
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {}
}

module.exports = { Graph, Node };
