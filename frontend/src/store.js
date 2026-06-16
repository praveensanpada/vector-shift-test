import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import {
  createWorkflowEdge,
  isValidWorkflowConnection,
  removeEdgesForDeletedNodes,
  removeInvalidTextVariableEdges,
} from "./utils/nodeHelpers";

const WORKFLOW_NAME_STORAGE_KEY = "vectorshift.workflowName";
const DEFAULT_WORKFLOW_NAME = "Untitled pipeline";

const getSavedWorkflowName = () => {
  if (typeof window === "undefined") {
    return DEFAULT_WORKFLOW_NAME;
  }

  return window.localStorage.getItem(WORKFLOW_NAME_STORAGE_KEY) || DEFAULT_WORKFLOW_NAME;
};

export const useStore = create((set, get) => ({
  workflowName: getSavedWorkflowName(),
  nodeIDs: {},
  nodes: [],
  edges: [],
  setWorkflowName: (workflowName) => {
    const nextWorkflowName = workflowName.trimStart();

    if (typeof window !== "undefined") {
      window.localStorage.setItem(WORKFLOW_NAME_STORAGE_KEY, nextWorkflowName || DEFAULT_WORKFLOW_NAME);
    }

    set({ workflowName: nextWorkflowName });
  },
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    newIDs[type] = (newIDs[type] || 0) + 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
      edges: removeEdgesForDeletedNodes(changes, get().edges),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    if (!isValidWorkflowConnection(connection, get().edges)) {
      return;
    }

    set({
      edges: addEdge(createWorkflowEdge(connection), get().edges),
    });
  },
  isValidConnection: (connection) => {
    return isValidWorkflowConnection(connection, get().edges);
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    const nextNodes = get().nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: { ...node.data, [fieldName]: fieldValue },
        };
      }

      return node;
    });

    const changedNode = nextNodes.find((node) => node.id === nodeId);
    const nextState = { nodes: nextNodes };

    if (changedNode?.type === "text" && fieldName === "text") {
      nextState.edges = removeInvalidTextVariableEdges({
        nodeId,
        text: fieldValue,
        edges: get().edges,
      });
    }

    set({ ...nextState });
  },
  resetPipeline: () => {
    set({ nodes: [], edges: [], nodeIDs: {} });
  },
}));
