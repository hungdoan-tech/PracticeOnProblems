function hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  
  function createConsistentHashing(nodes = [], replicationFactor = 3) {
    const keys = {};
    const sortedNodes = [];
  
    function populateKeys() {
      for (const node of nodes) {
        for (let i = 0; i < replicationFactor; i++) {
          const nodeId = `${node}-${i}`;
          const hashValue = hash(nodeId);
          keys[hashValue] = node;
          sortedNodes.push(hashValue);
        }
      }
      sortedNodes.sort((a, b) => a - b);
    }
  
    function getNode(key) {
      const hashValue = hash(key);
      let i = 0;
      while (sortedNodes[i] < hashValue) {
        i++;
      }
      return keys[sortedNodes[i]] || keys[sortedNodes[0]];
    }
  
    function addNode(node) {
      nodes.push(node);
      populateKeys();
    }
  
    function removeNode(node) {
      nodes = nodes.filter((n) => n !== node);
      populateKeys();
    }
  
    populateKeys();
  
    return { getNode, addNode, removeNode };
  }
  
  const consistentHashing = createConsistentHashing(['Node1', 'Node2', 'Node3']);
  
  console.log(consistentHashing.getNode('Key1')); // Output: Node2
  console.log(consistentHashing.getNode('Key2')); // Output: Node3
  
  consistentHashing.addNode('Node4');
  console.log(consistentHashing.getNode('Key3')); // Output: Node4
  
  consistentHashing.removeNode('Node2');
  console.log(consistentHashing.getNode('Key4')); // Output: Node1
  