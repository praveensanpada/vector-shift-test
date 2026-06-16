# VectorShift Assessment Video Script

This file is a simple 5 to 7 minute speaking script for presenting the project to a hiring manager.

## 1. Opening Introduction

Hello, my name is Praveen Sanpada.

I am a Software Development Specialist with 4+ years of experience in backend engineering, AI systems, and scalable distributed applications.

My main areas of work are Python, FastAPI, Node.js, React, databases, LLMs, RAG pipelines, vector search, and cloud-native systems.

Currently, I work as a Senior Software Engineer at Vinfotech, where I build AI-driven microservices, RAG systems, real-time ML workflows, and scalable backend platforms.

Before that, I worked at Magnet Brains and Auriga IT, where I built backend services, full-stack applications, REST APIs, data pipelines, and automation systems.

I am also pursuing my M.Tech in Artificial Intelligence and Data Science from IIT Patna, which helps me combine software engineering with AI and machine learning concepts.

In this video, I will walk through my VectorShift frontend assessment project. I will explain the product idea, architecture, node abstraction, Text node variable logic, backend DAG validation, and then I will show three workflow examples.

## 2. Project Overview

This project is a visual AI workflow builder.

The user can drag nodes onto a canvas, connect them, write text prompts, create dynamic variables, and submit the pipeline for backend validation.

The frontend is built with React and React Flow.

The backend is built with FastAPI.

The main backend endpoint receives nodes and edges, counts them, and checks if the pipeline is a DAG.

In simple words, the app answers this question:

```text
Is this workflow graph valid and cycle-free?
```

## 3. How To Run

The project is split into two folders.

For backend:

```bash
cd backend
./setup_and_run.sh
```

For frontend:

```bash
cd frontend
./setup_and_run.sh
```

The setup scripts create the environment, install dependencies, and start the app.

The frontend runs on:

```text
http://localhost:3000
```

The backend runs on:

```text
http://127.0.0.1:8000
```

## 4. Architecture Explanation

I kept the architecture simple and practical for the assessment.

On the frontend, the main parts are:

- `PipelineToolbar` for node creation buttons
- `PipelineCanvas` for the React Flow editor
- `SubmitPanel` for submitting the pipeline and showing the result
- `BaseNode` for reusable node UI
- `TextNode` for dynamic variable parsing
- `pipelineApi` for backend API calls
- `store.js` for frontend graph state

On the backend, there are only three important files:

- `main.py` for FastAPI routes
- `schemas.py` for request and response models
- `graph_utils.py` for node counting, edge counting, and DAG validation

I did not add a database because the assessment only requires one backend endpoint and graph validation. For the workflow name, I used browser `localStorage`, which is enough for this scope.

## 5. Node Abstraction

One important part of the assessment was node abstraction.

Instead of copying code for every node, I created a reusable node structure.

Common node UI is handled by:

```text
BaseNode.jsx
NodeHeader.jsx
NodeField.jsx
NodeHandles.jsx
```

This keeps the code maintainable.

For example, Input, Output, LLM, API, Database, PDF Loader, Summarizer, and Email nodes can reuse the same layout system.

If a future engineer wants to add a new node, they do not need to rewrite the whole component. They can mostly define the node title, fields, handles, and metadata.

That makes the project easier to scale.

## 6. Text Node Logic

The Text node is the most important custom node.

When the user types:

```text
Hello {{name}}, summarize {{document}}
```

The app detects:

```text
name
document
```

Then it creates handles for those variables on the left side of the Text node.

It only accepts valid JavaScript variable names.

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
```

This logic is separated into a utility file, so parsing logic is not mixed directly with UI logic.

## 7. Backend And DSA Concept

The backend receives the pipeline as nodes and edges.

Example:

```text
Input -> Text -> LLM -> Output
```

Here:

- each node is a graph vertex
- each connection is a directed edge
- the full pipeline is a directed graph

The DSA concept used here is graph cycle detection.

A DAG means Directed Acyclic Graph.

Valid DAG:

```text
A -> B -> C
```

Invalid DAG:

```text
A -> B -> A
```

The backend checks whether a cycle exists.

The time complexity is:

```text
O(V + E)
```

Where:

- `V` is number of nodes
- `E` is number of edges

This is efficient because the algorithm only needs to visit nodes and edges.

## 8. Workflow Example 1: Basic LLM Assistant

This is the simplest workflow.

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

How I would explain it in the video:

This workflow takes user input, adds it into a prompt using the Text node, sends it to the LLM node, and then returns the final answer through the Output node.

This is useful for a simple AI assistant or prompt-based automation.

Example Text node content:

```text
Answer this user question: {{question}}
```

The Text node will create a `question` handle automatically.

## 9. Workflow Example 2: PDF Summary Workflow

This workflow is useful for document processing.

```text
[PDF Loader]
     |
     v
[Text]
     |
     v
[Summarizer]
     |
     v
[Output]
```

How I would explain it in the video:

Here, the PDF Loader node represents a document source. The Text node prepares the prompt, the Summarizer node represents summary logic, and the Output node gives the final result.

Example Text node content:

```text
Summarize this document in 5 bullet points: {{document}}
```

This shows how the workflow builder can support AI document-processing use cases.

## 10. Workflow Example 3: Customer Email Automation

This workflow uses more nodes and looks good in a demo.

```text
[Database]       [API]
     |             |
     v             v
          [Text]
             |
             v
           [LLM]
             |
             v
          [Email]
```

How I would explain it in the video:

This workflow combines customer data from a database and live information from an API. The Text node creates a personalized message, the LLM node improves the language, and the Email node represents sending the final message.

Example Text node content:

```text
Write a polite update email for {{customerName}} using {{apiStatus}}
```

This creates two handles:

```text
customerName
apiStatus
```

This example is strong because it shows multiple inputs, dynamic variables, and a real business automation use case.

## 11. Demo Flow For Video

Use this order while recording.

### Minute 0:00 To 1:00

Introduce yourself.

Mention:

- 4+ years of backend and AI engineering experience
- FastAPI, Node.js, React, LLMs, RAG, vector search
- current Senior Software Engineer role
- M.Tech AI and Data Science from IIT Patna

### Minute 1:00 To 2:00

Open the app and explain the product.

Say:

```text
This is a visual AI workflow builder. Users can create nodes, connect them, add variables, and validate the graph from the backend.
```

### Minute 2:00 To 3:00

Show the node abstraction.

Mention:

- reusable BaseNode
- common header, fields, handles, and styling
- new nodes can be added easily

### Minute 3:00 To 4:00

Show the Text node.

Type:

```text
Hello {{name}}, summarize {{document}}
```

Explain that handles are created automatically.

### Minute 4:00 To 5:00

Create one full pipeline and submit it.

Show:

- node count
- edge count
- DAG status

Explain that backend validates the graph.

### Minute 5:00 To 6:00

Explain DSA.

Say:

```text
The backend treats the workflow as a directed graph. Nodes are vertices and connections are edges. It checks whether the graph has a cycle. The complexity is O(V + E).
```

### Minute 6:00 To 7:00

Close with summary.

Say:

```text
This project demonstrates clean React component design, reusable node abstraction, dynamic Text node logic, FastAPI backend integration, and correct DAG validation. I kept the architecture simple and focused on the assessment requirements without adding unnecessary database or enterprise layers.
```

## 12. Closing Statement

To summarize, this project shows my ability to build both frontend and backend parts of an AI workflow platform.

On the frontend, I focused on clean React architecture, reusable components, polished UI, and good user experience.

On the backend, I kept the FastAPI implementation lightweight, typed, and focused on graph validation.

The project also connects with my background in backend systems, AI workflows, RAG, LLM applications, and production-grade engineering.

Thank you for reviewing my submission.
