# Test Pipeline Workflows

Use this file to create strong demo workflows inside the VectorShift Pipeline Builder. These examples are made for testing the app and recording a clean video demo.

## 1. Basic LLM Assistant

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

Text node:

```text
Answer this user question clearly: {{question}}
```

Why this is good:

- simple and easy to explain
- shows Input, Text, LLM, and Output
- creates one dynamic handle: `question`

## 2. PDF Summary Pipeline

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

Text node:

```text
Summarize this document in 5 bullet points: {{document}}
```

Why this is good:

- shows document-processing use case
- demonstrates the PDF Loader and Summarizer nodes
- creates one dynamic handle: `document`

## 3. Customer Email Automation

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

Text node:

```text
Write a polite customer update email for {{customerName}} using this status: {{apiStatus}}
```

Why this is good:

- looks like a real business workflow
- uses multiple inputs
- creates two dynamic handles: `customerName`, `apiStatus`

## 4. Support Ticket Triage

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
[Database]
   |
   v
[Output]
```

Text node:

```text
Classify this support ticket by urgency and category: {{ticketText}}
```

Why this is good:

- realistic SaaS support workflow
- shows classification style AI use case
- creates one dynamic handle: `ticketText`

## 5. API Data Report

```text
[API]
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

Text node:

```text
Create a short report from this API response: {{apiData}}
```

Why this is good:

- easy to explain in a demo
- shows how API data can move through an AI workflow
- creates one dynamic handle: `apiData`

## 6. Personalized Newsletter

```text
[Database]       [Input]
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

Text node:

```text
Write a newsletter for {{userSegment}} about {{topic}} in a friendly tone.
```

Why this is good:

- shows personalization
- combines database data and manual input
- creates two dynamic handles: `userSegment`, `topic`

## 7. Resume Screening Workflow

```text
[PDF Loader]
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

Text node:

```text
Review this resume and list strengths, gaps, and role fit: {{resumeText}}
```

Why this is good:

- strong AI hiring workflow example
- simple to build
- creates one dynamic handle: `resumeText`

## 8. Finance Insight Pipeline

```text
[API]
  |
  v
[Text]
  |
  v
[LLM]
  |
  v
[Summarizer]
  |
  v
[Output]
```

Text node:

```text
Analyze this market data and explain the key risks: {{marketData}}
```

Why this is good:

- shows an analytical workflow
- useful for finance, prediction markets, or dashboards
- creates one dynamic handle: `marketData`

## 9. Multi-Source Knowledge Assistant

```text
[Input]       [PDF Loader]       [Database]
   |              |                  |
   v              v                  v
          [Text]
             |
             v
           [LLM]
             |
             v
          [Output]
```

Text node:

```text
Answer {{question}} using document context {{document}} and database context {{dbContext}}.
```

Why this is good:

- best example for showing multiple dynamic handles
- looks like a RAG-style workflow
- creates three dynamic handles: `question`, `document`, `dbContext`

## 10. Full Product Demo Workflow

```text
[Input]       [PDF Loader]       [API]       [Database]
   |              |                |             |
   v              v                v             v
                 [Text]
                    |
                    v
                  [LLM]
                    |
                    v
              [Summarizer]
                    |
                    v
                 [Email]
                    |
                    v
                [Output]
```

Text node:

```text
Create a final client update for {{clientName}} using {{document}}, {{apiStatus}}, and {{accountData}}.
```

Why this is good:

- uses almost all node types
- best for final video presentation
- creates four dynamic handles: `clientName`, `document`, `apiStatus`, `accountData`
- clearly shows the value of a visual workflow builder

## Best Workflow To Show First

Start with this one:

```text
[Input] -> [Text] -> [LLM] -> [Output]
```

It is simple and helps the reviewer understand the product quickly.

## Best Workflow To Show Last

End with this one:

```text
[Input] + [PDF Loader] + [API] + [Database] -> [Text] -> [LLM] -> [Summarizer] -> [Email] -> [Output]
```

It looks complete and shows the full power of the node system.

## Testing Checklist

For each workflow:

1. Add all nodes.
2. Connect handles in the same direction as the diagram.
3. Type the Text node prompt.
4. Confirm variable handles appear.
5. Submit the pipeline.
6. Confirm the modal shows node count, edge count, and DAG status.

## Cycle Test

To test invalid DAG behavior, create this:

```text
[Input] -> [Text]
   ^         |
   |         v
 [Output] <-+
```

Expected result:

```text
is_dag = false
```

This proves the backend is checking graph cycles correctly.
