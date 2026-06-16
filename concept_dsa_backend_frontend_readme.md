# VectorShift Project Complete Explanation

This file explains the full project in simple language: what it does, how the frontend works, how the backend works, what DSA concept is used, which libraries are used, and how the workflow moves from user action to backend validation.

## 1. Project Concept

This project is a visual pipeline builder.

The user can:

- add nodes to a canvas
- drag nodes around
- connect nodes using handles
- type variables inside the Text node
- submit the pipeline
- see whether the pipeline is a valid DAG

In simple words, it is like a small version of an AI workflow builder.

Example:

```text
Input -> Text -> LLM -> Output
```

This means:

1. user input comes from the Input node
2. Text node creates a prompt
3. LLM node processes the prompt
4. Output node shows the result

## 2. Main Requirement Covered

The assessment asks for four main things.

### Node Abstraction

Instead of writing the same node UI again and again, the project has a reusable node system.

Common node UI is kept inside:

```text
frontend/src/components/nodes/BaseNode.jsx
```

Other files support the node UI:

```text
NodeHeader.jsx
NodeField.jsx
NodeHandles.jsx
```

This means every node can share:

- same card design
- same header style
- same input field style
- same handle rendering
- same delete behavior

So when a new node is needed, we do not copy a full old node. We mostly add configuration.

### Styling

The app has a clean workflow builder UI:

- top toolbar
- draggable node buttons
- grid canvas
- styled node cards
- submit panel
- result modal
- hover and selected states

Most styling is inside:

```text
frontend/src/index.css
```

Shared values are inside:

```text
frontend/src/styles/theme.js
```

### Text Node Logic

The Text node supports variables like:

```text
Hello {{name}}, summarize {{document}}
```

From this text, the app detects:

```text
name
document
```

Then it creates input handles on the left side of the Text node.

So the user can connect another node to `name` or `document`.

### Backend Integration

When the user clicks `Submit Pipeline`, the frontend sends nodes and edges to the backend.

Backend endpoint:

```text
POST /pipelines/parse
```

Backend returns:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

## 3. Frontend Libraries Used

### React

React is used to build the UI.

Main app file:

```text
frontend/src/App.js
```

It renders:

```text
PipelineToolbar
PipelineCanvas
SubmitPanel
```

### React Flow

React Flow is used for the workflow editor.

It gives:

- canvas
- draggable nodes
- edges
- handles
- zoom controls
- minimap
- node selection

Important file:

```text
frontend/src/components/PipelineCanvas.jsx
```

### Zustand

Zustand is used for frontend state management.

Important file:

```text
frontend/src/store.js
```

It stores:

- nodes
- edges
- workflow name
- node ID counters
- add node logic
- delete node logic
- connect node logic
- update field logic
- reset pipeline logic

### Browser localStorage

The workflow name is stored in browser `localStorage`.

This is used because the assessment does not require a database.

Example:

```text
Workflow name: Customer Email Assistant
```

If the user refreshes the browser, the name stays saved.

## 4. Backend Libraries Used

### FastAPI

FastAPI creates the backend API.

Important file:

```text
backend/main.py
```

It defines:

```text
GET /
POST /pipelines/parse
```

### Pydantic

Pydantic validates request and response data.

Important file:

```text
backend/schemas.py
```

It defines models for:

- node payload
- edge payload
- pipeline request
- pipeline response

### NetworkX

NetworkX is used to check if the graph is a DAG.

Important file:

```text
backend/graph_utils.py
```

It builds a directed graph and checks:

```text
is this graph acyclic?
```

### Uvicorn

Uvicorn runs the FastAPI server.

The backend can be started with:

```bash
cd backend
./setup_and_run.sh
```

## 5. Frontend Code Flow

This is the frontend flow from user action to backend response.

```text
User opens app
      |
      v
PipelineToolbar shows node buttons
      |
      v
User drags a node onto canvas
      |
      v
PipelineCanvas creates a React Flow node
      |
      v
store.js saves node in Zustand state
      |
      v
User connects handles
      |
      v
store.js saves edge in Zustand state
      |
      v
User clicks Submit Pipeline
      |
      v
SubmitPanel calls pipelineApi.js
      |
      v
Frontend sends nodes and edges to FastAPI
      |
      v
Backend returns node count, edge count, DAG result
      |
      v
SubmitPanel shows result modal
```

## 6. Backend Code Flow

This is the backend flow after the frontend submits a pipeline.

```text
POST /pipelines/parse
      |
      v
FastAPI receives request
      |
      v
Pydantic validates nodes and edges
      |
      v
graph_utils.py counts nodes
      |
      v
graph_utils.py counts edges
      |
      v
graph_utils.py checks DAG
      |
      v
FastAPI returns response
```

Example request:

```json
{
  "nodes": [
    { "id": "input-1" },
    { "id": "text-1" },
    { "id": "output-1" }
  ],
  "edges": [
    { "source": "input-1", "target": "text-1" },
    { "source": "text-1", "target": "output-1" }
  ]
}
```

Example response:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## 7. DSA Concept

The main DSA concept is graph cycle detection.

In this project:

- node means vertex
- edge means directed connection
- pipeline means directed graph

Example graph:

```text
A -> B -> C
```

This is a DAG because there is no cycle.

Cycle example:

```text
A -> B
^    |
|    v
D <- C
```

This is not a DAG because we can start from `A` and come back to `A`.

## 8. What Is DAG?

DAG means Directed Acyclic Graph.

Directed means:

```text
A -> B
```

The edge has a direction.

Acyclic means:

```text
No loop exists.
```

So a DAG is a graph where all edges have direction and no cycle exists.

## 9. DAG Time Complexity

The DAG check is efficient.

Time complexity:

```text
O(V + E)
```

Where:

- `V` = number of nodes
- `E` = number of edges

Why?

Because the graph algorithm only needs to visit nodes and edges.

Space complexity:

```text
O(V + E)
```

Because the graph structure stores nodes and edges.

## 10. Text Node Variable Parsing

The Text node looks for variables in this format:

```text
{{variableName}}
```

Valid examples:

```text
{{name}}
{{email}}
{{user_id}}
{{customerName}}
```

Invalid examples:

```text
{{123name}}
{{first name}}
{{user-name}}
```

The parsing logic is inside:

```text
frontend/src/utils/variableParser.js
```

The UI logic is inside:

```text
frontend/src/nodes/TextNode.jsx
```

This separation is good because parsing logic can be tested or changed without touching the UI.

## 11. How Node Creation Works

Node creation starts from the toolbar.

```text
DraggableNode.jsx
      |
      v
PipelineCanvas.jsx
      |
      v
createNodeData in nodeHelpers.js
      |
      v
store.js addNode
      |
      v
React Flow renders the node
```

Each node type is defined in:

```text
frontend/src/nodes/nodeDefinitions.js
```

Example node types:

- Input
- Output
- LLM
- Text
- API
- PDF Loader
- Database
- Summarizer
- Email

## 12. Why BaseNode Is Useful

Without `BaseNode`, every node would repeat:

- card layout
- title
- subtitle
- fields
- handles
- delete button
- styling classes

That becomes hard to maintain.

With `BaseNode`, the common UI is written once.

Then each node only says:

```text
I need these fields.
I need these handles.
I need this title.
I need this color.
```

This is cleaner and easier to extend.

## 13. Pipeline Examples

### Example 1: Basic LLM Pipeline

```text
[Input]
   |
   v
[Text]
   |
   v
[LLM]
   |
   v
[Output]
```

Use case:

```text
User gives a question. LLM answers it.
```

### Example 2: PDF Summary Pipeline

```text
[PDF Loader]
     |
     v
[Text: "Summarize {{document}}"]
     |
     v
[Summarizer]
     |
     v
[Output]
```

Use case:

```text
Upload document and generate summary.
```

### Example 3: API Email Pipeline

```text
[API]
  |
  v
[Text: "Send update to {{email}}"]
  |
  v
[Email]
```

Use case:

```text
Take API data and send email update.
```

### Example 4: Database Report Pipeline

```text
[Database]
    |
    v
[Text]
    |
    v
[LLM]
    |
    v
[Output]
```

Use case:

```text
Turn database data into a readable report.
```

### Example 5: Full Workflow Demo

```text
[Input]       [PDF Loader]       [Database]
   |              |                  |
   v              v                  v
        [Text with {{name}} and {{document}}]
                         |
                         v
                       [LLM]
                         |
                         v
                    [Summarizer]
                         |
                         v
                      [Email]
```

Use case:

```text
Take user input, document content, and database context.
Build a prompt.
Generate AI result.
Summarize it.
Send it by email.
```

## 14. Why No Database Is Used

This assessment does not ask for saving full workflows permanently.

It asks for:

- frontend workflow builder
- node abstraction
- text variable parsing
- backend DAG validation
- one API endpoint

So adding a database would make the project heavier than needed.

Current persistence:

```text
workflow name -> localStorage
nodes and edges -> frontend state
```

If this becomes a real product, then a database can store:

```text
workflow_id
workflow_name
nodes
edges
created_at
updated_at
owner_id
```

But for the assessment, the current approach is better because it is simple and focused.

## 15. How To Explain In Interview

You can explain it like this:

```text
I built a visual workflow editor using React Flow. I refactored the node system around a reusable BaseNode abstraction, so new node types can be added mostly through configuration. The Text node parses valid JavaScript-style variables from double curly braces and dynamically creates input handles for them. On submit, the frontend serializes nodes and edges and sends them to a FastAPI backend. The backend validates the request with Pydantic, counts nodes and edges, and checks if the graph is a DAG using graph cycle detection. The result is shown in a modal in the frontend.
```

Short version:

```text
React builds the workflow UI.
React Flow handles canvas, nodes, edges, and handles.
Zustand stores frontend graph state.
FastAPI receives the graph.
NetworkX checks if it is a DAG.
The UI shows the validation result.
```

## 16. Common Test Cases

### Valid DAG

```text
Input -> Text -> Output
```

Result:

```text
is_dag = true
```

### Invalid DAG

```text
Input -> Text
Text -> Input
```

Result:

```text
is_dag = false
```

### Disconnected Nodes

```text
[Input]       [Output]
```

Result:

```text
is_dag = true
```

Why?

Because there is no cycle. It is acyclic, but the UI still warns that the pipeline is incomplete.

## 17. Final Summary

This project is clean because:

- frontend logic is separated from backend logic
- node UI is reusable
- variable parsing is isolated
- API call is isolated
- backend validation is lightweight
- DSA concept is correctly applied
- no unnecessary database or enterprise pattern is added

It is a practical assessment solution, not an over-engineered production system.
