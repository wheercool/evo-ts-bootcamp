import { BinaryTree, TraverseType } from './BinaryTree';
import { IBinaryTree } from './IBinaryTree';

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
    let tree: IBinaryTree<number>;
    beforeEach(() => {
      tree = {
        value: 1,
        left: {
          value: 2,
          left: { value: 4 },
          right: { value: 5 }
        },
        right: {
          value: 3
        }
      }
    })
    describe('InOrder', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = new BinaryTree<number>({ value: 1 }).traverse(TraverseType.InOrder);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = new BinaryTree(tree).traverse(TraverseType.InOrder);
        expect(actual).toEqual([4, 2, 5, 1, 3]);
      })
    })
    describe('PreOrder', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = new BinaryTree<number>({ value: 1 }).traverse(TraverseType.PreOrder);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = new BinaryTree(tree).traverse(TraverseType.PreOrder);
        expect(actual).toEqual([1, 2, 4, 5, 3]);
      })
    })

    describe('PostOrder', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = new BinaryTree<number>({ value: 1 }).traverse(TraverseType.PostOrder);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = new BinaryTree(tree).traverse(TraverseType.PostOrder);
        expect(actual).toEqual([4, 5, 2, 3, 1]);
      })
    })
    describe('BFS', () => {
      it('assert 1 if tree contains only 1 element', () => {
        const actual = new BinaryTree<number>({ value: 1 }).traverse(TraverseType.BFS);
        expect(actual).toEqual([1])
      })
      it('should sort a tree in inorder order', () => {
        const actual = new BinaryTree(tree).traverse(TraverseType.BFS);
        expect(actual).toEqual([1, 2, 3, 4, 5]);
      })
    })
  })
})
