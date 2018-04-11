'use strict';
const node = {
  right:'hi'
};

console.log(node.right && (node.right.left || node.right.right));