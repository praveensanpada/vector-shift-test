import { BaseNode } from "../components/nodes/BaseNode";
import { NODE_DEFINITIONS } from "./nodeDefinitions";

const qualifyHandleIds = (nodeId, handles = []) =>
  handles.map((handle) => ({
    ...handle,
    id: handle.global ? handle.id : `${nodeId}-${handle.id}`,
  }));

export const ConfiguredNode = ({ id, data, definition }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title={definition.title}
      subtitle={definition.subtitle}
      tone={definition.tone}
      fields={definition.fields}
      handles={qualifyHandleIds(id, definition.handles)}
    >
      {definition.body ? <p className="node-body-copy">{definition.body}</p> : null}
    </BaseNode>
  );
};

export const createConfiguredNode = (type) => {
  return function WorkflowConfiguredNode(props) {
    return <ConfiguredNode {...props} definition={NODE_DEFINITIONS[type]} />;
  };
};
