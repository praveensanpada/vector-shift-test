import { MarkerType } from "reactflow";
import { NODE_DEFINITIONS } from "../nodes/nodeDefinitions";
import { extractTemplateVariables } from "./variableParser";

export const createNodeData = (nodeId, type) => {
  const defaults = NODE_DEFINITIONS[type]?.defaults;

  return {
    id: nodeId,
    nodeType: type,
    ...(typeof defaults === "function" ? defaults(nodeId) : {}),
  };
};

export const createWorkflowEdge = (connection) => ({
  ...connection,
  type: "smoothstep",
  animated: true,
  markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
});

export const isDuplicateConnection = (connection, edges) =>
  edges.some((edge) =>
    edge.source === connection.source &&
    edge.target === connection.target &&
    edge.sourceHandle === connection.sourceHandle &&
    edge.targetHandle === connection.targetHandle
  );

export const isValidWorkflowConnection = (connection, edges) => {
  if (!connection.source || !connection.target || connection.source === connection.target) {
    return false;
  }

  return !isDuplicateConnection(connection, edges);
};

export const removeEdgesForDeletedNodes = (changes, edges) => {
  const deletedNodeIds = changes
    .filter((change) => change.type === "remove")
    .map((change) => change.id);

  if (deletedNodeIds.length === 0) {
    return edges;
  }

  const deleted = new Set(deletedNodeIds);
  return edges.filter((edge) => !deleted.has(edge.source) && !deleted.has(edge.target));
};

export const removeInvalidTextVariableEdges = ({ nodeId, text, edges }) => {
  const validVariableHandles = new Set(extractTemplateVariables(text));

  return edges.filter((edge) => {
    if (edge.target !== nodeId) {
      return true;
    }

    return validVariableHandles.has(edge.targetHandle);
  });
};

export const serializePipeline = ({ nodes, edges }) => ({
  nodes: nodes.map(({ id, type, position, data }) => ({
    id,
    type,
    position,
    data,
  })),
  edges: edges.map(({ id, source, target, sourceHandle, targetHandle }) => ({
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
  })),
});
