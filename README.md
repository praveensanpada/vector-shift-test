# VectorShift Pipeline Builder

This is a small workflow builder made for the VectorShift frontend assessment. You can drag nodes, connect them, type variables inside the Text node, submit the pipeline, and see whether the graph is a valid DAG.

The project is intentionally simple:

- React handles the workflow editor.
- FastAPI validates the submitted pipeline.
- No database is required for this assessment.
- The workflow name is saved in the browser using `localStorage`.

## Run The Project

Open two terminals from the project root.

### Terminal 1: Backend

```bash
cd backend
./setup_and_run.sh
```

This script will:

- create `vector_shift_venv` if it does not exist
- create `.env` from `.env.example` if needed
- install Python requirements
- start the FastAPI server

Backend runs here:

```text
http://127.0.0.1:8000
```

### Terminal 2: Frontend

```bash
cd frontend
./setup_and_run.sh
```

This script will:

- create `.env` from `.env.example` if needed
- install npm packages
- start the React app

Frontend runs here:

```text
http://localhost:3000
```

## How To Make A Pipeline

1. Start backend and frontend.
2. Open `http://localhost:3000`.
3. Edit the workflow name from the top-left title area.
4. Drag nodes from the top toolbar into the canvas.
5. Connect one node handle to another node handle.
6. For the Text node, type variables like:

```text
Hello {{name}}, please summarize {{document}}
```

7. The Text node will automatically create handles for `name` and `document`.
8. Click `Submit Pipeline`.
9. The modal will show:

- number of nodes
- number of edges
- whether the graph is a DAG

## Example Pipelines

### 1. Simple Prompt Pipeline

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

Use this when you want to take user input, build a prompt, send it to an LLM, and show the result.

### 2. PDF Summary Pipeline

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

Use this for a document-summary demo.

### 3. API To Email Pipeline

```text
[API]
  |
  v
[Text: "Send update to {{email}}"]
  |
  v
[Email]
```

Use this when an API response should be turned into an email message.

### 4. Database Report Pipeline

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

Use this when database data needs to become a clean natural-language report.

### 5. Full AI Workflow

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

This is a good example to show in a video because it uses many node types and still stays easy to explain.

## Code Explanation

### Frontend

The frontend is built with React and React Flow.

Important files:

- `frontend/src/store.js` keeps nodes, edges, workflow name, and node field updates.
- `frontend/src/components/PipelineCanvas.jsx` renders the React Flow canvas.
- `frontend/src/components/PipelineToolbar.jsx` shows the node buttons and editable workflow name.
- `frontend/src/components/SubmitPanel.jsx` sends the pipeline to the backend and shows the result modal.
- `frontend/src/components/nodes/BaseNode.jsx` is the common node layout.
- `frontend/src/nodes/nodeDefinitions.js` stores node configuration.
- `frontend/src/utils/variableParser.js` finds variables like `{{name}}`.
- `frontend/src/services/pipelineApi.js` calls the backend API.

The main idea is that every node should not repeat the same UI code. Most nodes reuse `BaseNode`, and only their fields/handles are different.

### Backend

The backend is intentionally small.

Important files:

- `backend/main.py` starts FastAPI and exposes `/pipelines/parse`.
- `backend/schemas.py` defines the request and response models.
- `backend/graph_utils.py` counts nodes, counts edges, and checks DAG validity.

The frontend sends nodes and edges to the backend. The backend returns:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## DSA Concept Used

The main DSA concept is graph cycle detection.

In this project:

- each node is a graph vertex
- each edge is a directed connection
- the backend checks whether the directed graph has a cycle

A DAG means Directed Acyclic Graph.

Simple valid DAG:

```text
A -> B -> C
```

This is valid because there is no way to come back to `A`.

Invalid graph:

```text
A -> B
^    |
|    v
D <- C
```

This is not a DAG because it has a cycle.

The backend uses graph logic similar to topological sorting. If all nodes can be processed without getting stuck in a cycle, it is a DAG.

Time complexity:

```text
O(V + E)
```

Where:

- `V` is number of nodes
- `E` is number of edges

This is efficient for this assessment because every node and edge is visited only a small number of times.

## About Database

No database is needed here.

The assessment asks for:

- React frontend
- FastAPI backend
- one API endpoint
- node abstraction
- text variable parsing
- DAG validation

For the workflow name, browser `localStorage` is enough. If this became a real product, then the next step would be saving pipelines in a database with fields like:

```text
id
name
nodes
edges
created_at
updated_at
```

For this assignment, adding a database would make the project bigger without improving the required solution.
