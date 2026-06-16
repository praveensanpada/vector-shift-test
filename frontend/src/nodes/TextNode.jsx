import { useEffect, useMemo, useRef } from "react";
import { useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "../components/nodes/BaseNode";
import { useStore } from "../store";
import { NODE_DEFINITIONS } from "./nodeDefinitions";
import { extractTemplateVariables } from "../utils/variableParser";

const MIN_WIDTH = 250;
const MAX_WIDTH = 500;
const MIN_TEXTAREA_HEIGHT = 84;

const getTextNodeWidth = (text) => {
  const longestLine = text.split("\n").reduce((max, line) => Math.max(max, line.length), 0);
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, longestLine * 8 + 104));
};

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);
  const definition = NODE_DEFINITIONS.text;
  const text = data?.text ?? definition.defaults().text;
  const variables = useMemo(() => extractTemplateVariables(text), [text]);
  const variableKey = variables.join("|");
  const width = useMemo(() => getTextNodeWidth(text), [text]);
  const minHeight = Math.max(178, variables.length * 28 + 140);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.max(MIN_TEXTAREA_HEIGHT, textarea.scrollHeight)}px`;
    updateNodeInternals(id);
  }, [id, text, updateNodeInternals]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variableKey, updateNodeInternals]);

  const handles = [
    ...variables.map((variable, index) => ({
      id: variable,
      type: "target",
      position: "left",
      top: `${((index + 1) / (variables.length + 1)) * 100}%`,
      label: variable,
      global: true,
    })),
    { id: `${id}-output`, type: "source", position: "right", label: "text" },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title={definition.title}
      subtitle={definition.subtitle}
      tone={definition.tone}
      handles={handles}
      className="workflow-node--text"
      style={{ width, minHeight }}
    >
      <label className="node-field">
        <span>Template</span>
        <textarea
          ref={textareaRef}
          className="node-control node-textarea"
          value={text}
          placeholder="Write text with {{variables}}"
          onChange={(event) => updateNodeField(id, "text", event.target.value)}
        />
      </label>
      {variables.length > 0 ? (
        <div className="variable-list" aria-label="Detected template variables">
          {variables.map((variable) => (
            <span key={variable}>{variable}</span>
          ))}
        </div>
      ) : null}
    </BaseNode>
  );
};
