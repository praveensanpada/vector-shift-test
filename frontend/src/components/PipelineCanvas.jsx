import { useCallback, useRef, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import { createNodeData } from "../utils/nodeHelpers";
import { useStore } from "../store";
import { NODE_DEFINITIONS } from "../nodes/nodeDefinitions";
import { InputNode } from "../nodes/InputNode";
import { LLMNode } from "../nodes/LLMNode";
import { OutputNode } from "../nodes/OutputNode";
import { TextNode } from "../nodes/TextNode";
import { ApiNode } from "../nodes/ApiNode";
import { PdfLoaderNode } from "../nodes/PdfLoaderNode";
import { DatabaseNode } from "../nodes/DatabaseNode";
import { SummarizerNode } from "../nodes/SummarizerNode";
import { EmailNode } from "../nodes/EmailNode";

import "reactflow/dist/style.css";

const GRID_SIZE = 20;
const PRO_OPTIONS = { hideAttribution: true };
const FIT_VIEW_OPTIONS = { padding: 0.24, maxZoom: 1 };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: ApiNode,
  pdfLoader: PdfLoaderNode,
  database: DatabaseNode,
  summarizer: SummarizerNode,
  email: EmailNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  isValidConnection: state.isValidConnection,
});

export const PipelineCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
  } = useStore(selector, shallow);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }

      const rawNodeData = event.dataTransfer.getData("application/reactflow");
      if (!rawNodeData) {
        return;
      }

      let draggedNode;
      try {
        draggedNode = JSON.parse(rawNodeData);
      } catch {
        return;
      }

      const type = draggedNode?.nodeType;
      if (!NODE_DEFINITIONS[type]) {
        return;
      }

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const fallbackPoint = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      const position = reactFlowInstance.screenToFlowPosition
        ? reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY })
        : reactFlowInstance.project(fallbackPoint);
      const id = getNodeID(type);

      addNode({
        id,
        type,
        position,
        data: createNodeData(id, type),
      });
    },
    [addNode, getNodeID, reactFlowInstance]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <section className="canvas-section">
      <div ref={reactFlowWrapper} className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={PRO_OPTIONS}
          snapGrid={[GRID_SIZE, GRID_SIZE]}
          connectionLineType="smoothstep"
          fitView
          fitViewOptions={FIT_VIEW_OPTIONS}
          minZoom={0.25}
          maxZoom={1.15}
        >
          <Background color="#d6dde8" gap={GRID_SIZE} size={1.6} />
          <Controls className="flow-controls" />
          <MiniMap className="flow-minimap" nodeStrokeWidth={3} zoomable pannable />
          {nodes.length === 0 ? (
            <div className="canvas-empty-state">
              <strong>Start with an Input or Text node</strong>
              <span>Drop nodes on the canvas and connect handles to compose a pipeline.</span>
            </div>
          ) : null}
        </ReactFlow>
      </div>
    </section>
  );
};
