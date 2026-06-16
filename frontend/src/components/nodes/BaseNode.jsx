import { useStore } from "../../store";
import { NodeField } from "./NodeField";
import { NodeHandles } from "./NodeHandles";
import { NodeHeader } from "./NodeHeader";

export const BaseNode = ({
  id,
  data,
  title,
  subtitle,
  tone,
  fields = [],
  handles = [],
  children,
  className = "",
  style,
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);
  const edges = useStore((state) => state.edges);
  const connectedHandles = new Set(
    edges.flatMap((edge) => {
      const handlesForNode = [];
      if (edge.source === id && edge.sourceHandle) {
        handlesForNode.push(edge.sourceHandle);
      }
      if (edge.target === id && edge.targetHandle) {
        handlesForNode.push(edge.targetHandle);
      }
      return handlesForNode;
    })
  );

  const handleFieldChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  return (
    <div className={`workflow-node ${className}`} style={style}>
      <NodeHandles connectedHandles={connectedHandles} handles={handles} />
      <button
        className="node-delete-button"
        type="button"
        aria-label={`Delete ${title} node`}
        title="Delete node"
        onClick={(event) => {
          event.stopPropagation();
          deleteNode(id);
        }}
      >
        Delete
      </button>
      <NodeHeader title={title} subtitle={subtitle} tone={tone} />
      {fields.length > 0 ? (
        <div className="node-fields">
          {fields.map((field) => (
            <NodeField
              key={field.name}
              field={field}
              value={data?.[field.name] ?? field.defaultValue ?? ""}
              onChange={handleFieldChange}
            />
          ))}
        </div>
      ) : null}
      {children ? <div className="node-content">{children}</div> : null}
    </div>
  );
};
