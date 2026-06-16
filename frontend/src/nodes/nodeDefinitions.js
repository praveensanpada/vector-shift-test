import { NODE_TONES } from "../styles/theme";

export const NODE_DEFINITIONS = {
  customInput: {
    title: "Input",
    subtitle: "Pipeline entry",
    tone: NODE_TONES.input,
    toolbarLabel: "Input",
    defaults: (id) => ({
      inputName: id.replace("customInput-", "input_"),
      inputType: "Text",
    }),
    fields: [
      { name: "inputName", label: "Name", type: "text" },
      {
        name: "inputType",
        label: "Type",
        type: "select",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
        ],
      },
    ],
    handles: [{ id: "value", type: "source", position: "right", label: "value" }],
  },
  llm: {
    title: "LLM",
    subtitle: "Generate response",
    tone: NODE_TONES.llm,
    toolbarLabel: "LLM",
    defaults: () => ({ model: "GPT-4o Mini", temperature: "Balanced" }),
    fields: [
      {
        name: "model",
        label: "Model",
        type: "select",
        options: [
          { value: "GPT-4o Mini", label: "GPT-4o Mini" },
          { value: "Claude Sonnet", label: "Claude Sonnet" },
          { value: "Llama 3.1", label: "Llama 3.1" },
        ],
      },
      {
        name: "temperature",
        label: "Temperature",
        type: "select",
        options: [
          { value: "Focused", label: "Focused" },
          { value: "Balanced", label: "Balanced" },
          { value: "Creative", label: "Creative" },
        ],
      },
    ],
    handles: [
      { id: "system", type: "target", position: "left", top: "34%", label: "system" },
      { id: "prompt", type: "target", position: "left", top: "66%", label: "prompt" },
      { id: "response", type: "source", position: "right", label: "response" },
    ],
  },
  customOutput: {
    title: "Output",
    subtitle: "Pipeline result",
    tone: NODE_TONES.output,
    toolbarLabel: "Output",
    defaults: (id) => ({
      outputName: id.replace("customOutput-", "output_"),
      outputType: "Text",
    }),
    fields: [
      { name: "outputName", label: "Name", type: "text" },
      {
        name: "outputType",
        label: "Type",
        type: "select",
        options: [
          { value: "Text", label: "Text" },
          { value: "Image", label: "Image" },
        ],
      },
    ],
    handles: [{ id: "value", type: "target", position: "left", label: "value" }],
  },
  text: {
    title: "Text",
    subtitle: "Prompt template",
    tone: NODE_TONES.text,
    toolbarLabel: "Text",
    defaults: () => ({ text: "{{input}}" }),
  },
  api: {
    title: "API",
    subtitle: "HTTP request",
    tone: NODE_TONES.api,
    toolbarLabel: "API",
    defaults: () => ({ method: "GET", endpoint: "https://api.example.com/data" }),
    fields: [
      {
        name: "method",
        label: "Method",
        type: "select",
        options: [
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
          { value: "PUT", label: "PUT" },
          { value: "DELETE", label: "DELETE" },
        ],
      },
      { name: "endpoint", label: "Endpoint", type: "url", placeholder: "https://api.example.com/data" },
    ],
    handles: [
      { id: "payload", type: "target", position: "left", label: "payload" },
      { id: "response", type: "source", position: "right", label: "response" },
    ],
  },
  pdfLoader: {
    title: "PDF Loader",
    subtitle: "Extract document text",
    tone: NODE_TONES.pdf,
    toolbarLabel: "PDF Loader",
    defaults: () => ({ source: "Contract.pdf", splitMode: "Pages" }),
    fields: [
      { name: "source", label: "Source", type: "text", placeholder: "Contract.pdf" },
      {
        name: "splitMode",
        label: "Split",
        type: "select",
        options: [
          { value: "Pages", label: "Pages" },
          { value: "Chunks", label: "Chunks" },
        ],
      },
    ],
    handles: [{ id: "documents", type: "source", position: "right", label: "documents" }],
  },
  database: {
    title: "Database",
    subtitle: "Query records",
    tone: NODE_TONES.database,
    toolbarLabel: "Database",
    defaults: () => ({ databaseType: "Postgres", query: "SELECT * FROM users" }),
    fields: [
      {
        name: "databaseType",
        label: "Type",
        type: "select",
        options: [
          { value: "Postgres", label: "Postgres" },
          { value: "MySQL", label: "MySQL" },
          { value: "MongoDB", label: "MongoDB" },
        ],
      },
      { name: "query", label: "Query", type: "textarea", rows: 2 },
    ],
    handles: [
      { id: "params", type: "target", position: "left", label: "params" },
      { id: "rows", type: "source", position: "right", label: "rows" },
    ],
  },
  summarizer: {
    title: "Summarizer",
    subtitle: "Condense context",
    tone: NODE_TONES.summarizer,
    toolbarLabel: "Summarizer",
    defaults: () => ({ format: "Bullets", maxLength: "Short" }),
    fields: [
      {
        name: "format",
        label: "Format",
        type: "select",
        options: [
          { value: "Bullets", label: "Bullets" },
          { value: "Paragraph", label: "Paragraph" },
          { value: "JSON", label: "JSON" },
        ],
      },
      {
        name: "maxLength",
        label: "Length",
        type: "select",
        options: [
          { value: "Short", label: "Short" },
          { value: "Medium", label: "Medium" },
          { value: "Long", label: "Long" },
        ],
      },
    ],
    handles: [
      { id: "content", type: "target", position: "left", label: "content" },
      { id: "summary", type: "source", position: "right", label: "summary" },
    ],
  },
  email: {
    title: "Email",
    subtitle: "Send message",
    tone: NODE_TONES.email,
    toolbarLabel: "Email",
    defaults: () => ({ to: "team@example.com", subject: "Pipeline update" }),
    fields: [
      { name: "to", label: "To", type: "email", placeholder: "team@example.com" },
      { name: "subject", label: "Subject", type: "text", placeholder: "Pipeline update" },
    ],
    handles: [
      { id: "body", type: "target", position: "left", label: "body" },
      { id: "sent", type: "source", position: "right", label: "sent" },
    ],
  },
};

export const TOOLBAR_NODES = [
  "customInput",
  "llm",
  "text",
  "customOutput",
  "api",
  "pdfLoader",
  "database",
  "summarizer",
  "email",
];
