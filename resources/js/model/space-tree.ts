import { SpaceNames } from './space';

/**
 * buildArray2Tree
 * - Build tree from an array
 */
interface RawSpaceHeader {
    id: string;
    pid: string;
    names: SpaceNames;
}

interface WorkUnit {
    nodes: SpaceNodeMap;
    parentFound: boolean;
}

interface WorkMap {
    [pid: string]: WorkUnit;
}

export const buildArray2Tree = (spaceHeaders: RawSpaceHeader[]): SpaceTrees => {
    let workMap: WorkMap = {};
    let rtnTrees: SpaceTrees = {
        id: '__ROOT__',
        childs: {},
    };
    // convert into map of nodes with pid as key
    spaceHeaders.forEach((spaceHeader: RawSpaceHeader) => {
        if (workMap[spaceHeader.pid] == null) {
            workMap[spaceHeader.pid] = {
                nodes: {},
                parentFound: false,
            };
        }
        workMap[spaceHeader.pid].nodes[spaceHeader.id] = {
            id: spaceHeader.id,
            childs: {},
            spaceNames: spaceHeader.names,
        };
    });
    // connect childs
    Object.values(workMap).forEach((workUnit: WorkUnit) => {
        Object.keys(workUnit.nodes).forEach((id: string) => {
            if (workMap[id]) {
                workUnit.nodes[id].childs = workMap[id].nodes;
                workMap[id].parentFound = true;
            }
        });
    });
    // find nodes with no parent matched
    Object.keys(workMap).forEach((pid: string) => {
        if (!workMap[pid].parentFound) {
            rtnTrees.childs = {
                ...rtnTrees.childs,
                ...workMap[pid].nodes,
            };
        }
    });
    return rtnTrees;
};

/**
 * Traverse tree with DFS
 */
const traverseSpaceTree = (
    tree: Node,
    callbackfn: (space: SpaceHeader, depth: number) => any,
    initDepth: number = 0,
) => {
    Object.values(tree.childs).forEach((node: Node) => {
        if (isSpaceNode(node))
            callbackfn({ id: node.id, names: node.spaceNames }, initDepth);
        traverseSpaceTree(node, (callbackfn = callbackfn), initDepth + 1);
    });
};

/**
 * Space Header
 */
interface SpaceHeader {
    id: string;
    names: SpaceNames;
}

/**
 * Space Node
 */
interface Node {
    id: string;
    childs: SpaceNodeMap;
}

interface RootNode extends Node {
    id: '__ROOT__';
}

interface SpaceNode extends Node {
    spaceNames: SpaceNames;
}

const isSpaceNode = (node: Node): node is SpaceNode => {
    return 'spaceNames' in node;
};

interface SpaceNodeMap {
    [id: string]: SpaceNode;
}

/**
 * Space Trees
 */
type SpaceTrees = RootNode;

export default SpaceTrees;
