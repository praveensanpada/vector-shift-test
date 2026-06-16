import { DraggableNode } from "./DraggableNode";
import { NODE_DEFINITIONS, TOOLBAR_NODES } from "../nodes/nodeDefinitions";
import { useStore } from "../store";

export const PipelineToolbar = () => {
  const workflowName = useStore((state) => state.workflowName);
  const setWorkflowName = useStore((state) => state.setWorkflowName);

  return (
    <header className="pipeline-toolbar">
      <div className="toolbar-brand">
        <div className="brand-mark">V</div>
        <div className="workflow-title-group">
          <h1>VectorShift Pipeline Builder</h1>
          <label className="workflow-title-editor">
            <span className="sr-only">Workflow name</span>
            <input
              value={workflowName}
              onChange={(event) => setWorkflowName(event.target.value)}
              onBlur={() => setWorkflowName(workflowName.trim() || "Untitled pipeline")}
              placeholder="Untitled pipeline"
              aria-label="Workflow name"
            />
          </label>
        </div>
      </div>

      <div className="toolbar-palette" aria-label="Node palette">
        {TOOLBAR_NODES.map((type) => (
          <DraggableNode
            key={type}
            type={type}
            label={NODE_DEFINITIONS[type].toolbarLabel}
            tone={NODE_DEFINITIONS[type].tone}
          />
        ))}
      </div>
    </header>
  );
};
