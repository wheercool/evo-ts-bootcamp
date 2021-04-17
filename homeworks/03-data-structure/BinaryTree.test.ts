import { BinaryTree, TraverseType } from './BinaryTree';

describe('BinaryTree', () => {
  describe('left', () => {
    it('assert undefined if no left branch', () => {
      const tree = new BinaryTree({ value: 1 });
      expect(tree.left).toBeUndefined();
    })
    it('should return left branch if exists', () => {
      const tree = new BinaryTree({ value: 1, left: { value: 2 } });
      expect(tree.left).toBeDefined();
    })
  })
  describe('right', () => {
    it('assert undefined if no left branch', () => {
      const tree = new BinaryTree({ value: 1 });
      expect(tree.left).toBeUndefined();
    })
    it('should return right branch if exists', () => {
      const tree = new BinaryTree({ value: 1, right: { value: 3 } });
      expect(tree.right).toBeDefined();
    })
  })
  describe('value', () => {
    it('should return root value of the tree', () => {
      const tree = new BinaryTree({ value: 1 });
      expect(tree.value).toEqual(1);
    })

  })
  describe('traverse', () => {
    let tree: BinaryTree<number>;
    let oneElementTree: BinaryTree<number>;
    beforeEach(() => {
      tree = new BinaryTree<number>({
        value: 1,
        left: {
          value: 2,
          left: { value: 4 },
          right: { value: 5 }
        },
        right: {
          value: 3
        }
      });
      oneElementTree = new BinaryTree<number>({
        value: 1
      });
    })
    describe('InOrder', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = oneElementTree.traverse(TraverseType.InOrder);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = tree.traverse(TraverseType.InOrder);
        expect(actual).toEqual([4, 2, 5, 1, 3]);
      })
    })
    describe('PreOrder', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = oneElementTree.traverse(TraverseType.PreOrder);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = tree.traverse(TraverseType.PreOrder);
        expect(actual).toEqual([1, 2, 4, 5, 3]);
      })
    })

    describe('PostOrder', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = oneElementTree.traverse(TraverseType.PostOrder);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = tree.traverse(TraverseType.PostOrder);
        expect(actual).toEqual([4, 5, 2, 3, 1]);
      })
    })
    describe('BFS', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = oneElementTree.traverse(TraverseType.BFS);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = tree.traverse(TraverseType.BFS);
        expect(actual).toEqual([1, 2, 3, 4, 5]);
      })
    })
  })
  describe('getColumn', () => {
    let tree: BinaryTree<number>;
    beforeEach(() => {
      tree = new BinaryTree<number>({
        value: 1,
        left: {
          value: 2,
          left: { value: 4 },
          right: { value: 5 }
        },
        right: {
          value: 3,
          left: { value: 6 },
          right: { value: 7 }
        }
      });
    })

    it('assert getColumn(0) = root value for one value tree', () => {
      const tree = new BinaryTree({ value: 1 });
      expect(tree.getColumn(0)).toEqual([1]);
    })
    it('assert getColumn(0) = [1, 5, 6]', () => {
      expect(tree.getColumn(0)).toEqual([1, 5, 6]);
    })
    it('assert getColumn(1) = [3]', () => {
      expect(tree.getColumn(1)).toEqual([3]);
    })
    it('assert getColumn(-1) = [2]', () => {
      expect(tree.getColumn(-1)).toEqual([2]);
    })
    it('assert getColumn(2) = [7]', () => {
      expect(tree.getColumn(2)).toEqual([7]);
    })
    it('assert getColumn(-2) = [4]', () => {
      expect(tree.getColumn(-2)).toEqual([4]);
    })
  })
})
