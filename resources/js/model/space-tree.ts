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
    let rtnTrees: SpaceTrees = [];
    // convert into map of nodes with pid as key
    spaceHeaders.forEach((spaceHeader: RawSpaceHeader) => {
        if (workMap[spaceHeader.pid] == null) {
            workMap[spaceHeader.pid] = {
                nodes: {},
                parentFound: false,
            };
        }
        workMap[spaceHeader.pid].nodes[spaceHeader.id] = {
            childs: {},
            spaceHeader: spaceHeader,
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
            rtnTrees = [...rtnTrees, ...Object.values(workMap[pid].nodes)];
        }
    });
    return rtnTrees;
};

/**
 * Traverse tree with DFS
 */
export const traverseSpaceTree = (
    tree: SpaceTree,
    callbackfn: (spaceHeader: SpaceHeader, depth: number) => any,
    initDepth: number = 0,
) => {
    callbackfn(tree.spaceHeader, initDepth);
    Object.values(tree.childs).forEach((node: SpaceNode) => {
        traverseSpaceTree(node, (callbackfn = callbackfn), initDepth + 1);
    });
};

/**
 * Space Header
 */
export interface SpaceHeader {
    id: string;
    names: SpaceNames;
}

/**
 * Space Node
 */
interface SpaceNode {
    childs: SpaceNodeMap;
    spaceHeader: SpaceHeader;
}

interface SpaceNodeMap {
    [id: string]: SpaceNode;
}

/**
 * Space Trees
 */
export type SpaceTree = SpaceNode;

type SpaceTrees = SpaceTree[];

export default SpaceTrees;
