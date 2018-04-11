'use strict';
class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}

//============================================ Height of BST ======================================>

// take a BST as a parameter
// establish parent array
// find the furthest that the tree extends on the left and right
// establish a counter variable

const findHeight = (bst) => {
  if (!bst.left && !bst.right) {
    return 1;
  }
  if (bst.left === null) {
    return findHeight(bst.right) + 1;
  }
  if (bst.right === null) {
    return findHeight(bst.left) + 1;
  }

  return (Math.max(findHeight(bst.left), findHeight(bst.right)) + 1);
};

// console.log('MATH MAX: ', Math.max(findHeight(bst.left), findHeight(bst.right)));


//============================================ Is BST?  ======================================>

// take in a binary tree as parameter
// 

const isBST = (bst,status=true) => {
  if (!bst.left && !bst.right) {
    return status;
  }
  if (bst.left === null) {
    return isBST(bst.right);
  }
  if (bst.right === null) {
    return isBST(bst.left);
  }
  if (bst.right.key < bst.key || bst.left.key > bst.key) {
    status = false;
    return status;
  }
  if (isBST(bst.right) && isBST(bst.left)) {
    return status;
  }

};

//============================================ Third largest node ======================================>

// take bst as a parameter
// take an array as a parameter
// use logic to find the largest node.
// every time you move forwards push the counter to the array;
// as a base case (.right is null) return arr.length -3


const thirdLargest = bst => {

  const addToArr = (bst) => {
    if (!bst.right && !bst.left) {
      return [bst.key];
    }
    if (bst.right && bst.left) {
      return [...addToArr(bst.left), ... addToArr(bst.right), bst.key];
    } 
  
    if (!bst.right) {
      return [...addToArr(bst.left), bst.key];
    }
  
    if (!bst.left) {
      return [...addToArr(bst.right), bst.key];
    }
  
  };

  let sortedArr = addToArr(bst);
  sortedArr = sortedArr.sort((a,b) => {
    return a>b;
  });
  return sortedArr[sortedArr.length-3];
};

//============================================ Balanced BST ======================================>

//Write an algorithm that checks if a BST is balanced (i.e. a tree where no two leaves differ in distance from the root by more than one).

// take BST as parameter
// take array as a parameter
// take a counter as parameter

const isEven = bst => {
  // if (!bst.left && !bst.right) {
  //   return true;
  // }

  if (!bst.left) {
    return !(bst.right && (bst.right.left || bst.right.right));
  }
  
  if (!bst.right) {
    return !(bst.left && (bst.left.right || bst.left.left));
  }
  
  return (isEven(bst.left) && isEven(bst.right));
};




//============================================ Main Function ======================================>

function main() {
  const myTree = new BinarySearchTree();
  myTree.insert(4);
  myTree.insert(2);
  myTree.insert(3);
  myTree.insert(10);
  myTree.insert(30);
  myTree.insert(31);
  myTree.insert(33);
  

  // console.log(myTree);
  // console.log(findHeight(myTree));
  // console.log(isBST(myTree));
  // console.log(thirdLargest(myTree));
  // console.log(thirdLargest(myTree));
  console.log(isEven(myTree));
}


main();