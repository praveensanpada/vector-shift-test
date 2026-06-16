# Video Recording Guide

This file explains the best free tools to create the VectorShift demo video and what to check before recording.

## Best Free Tool

The best free tool is:

```text
OBS Studio
```

Website:

```text
https://obsproject.com
```

Why OBS is best:

- completely free
- no watermark
- records screen and voice
- works on Windows, macOS, and Linux
- good video quality
- used by many developers and creators

If you want the simplest option, use:

```text
Loom Free Plan
```

Website:

```text
https://www.loom.com
```

Loom is easier than OBS, but the free plan may have limits.

My recommendation:

```text
Use OBS Studio if you want the best free option.
Use Loom if you want the fastest simple recording.
```

## Other Free Options

### 1. OBS Studio

Best for final submission.

Good for:

- screen recording
- microphone recording
- high-quality export
- no watermark

### 2. Loom Free

Good for:

- quick video recording
- easy sharing
- webcam + screen

Limitation:

- free plan may have length or storage limits

### 3. Microsoft Clipchamp

Good for:

- basic editing
- trimming video
- adding simple cuts

Website:

```text
https://clipchamp.com
```

### 4. Canva Free

Good for:

- creating simple title slides
- editing short presentation videos

Website:

```text
https://www.canva.com
```

### 5. Screenity Chrome Extension

Good for:

- quick browser recording
- simple screen capture

Website:

```text
https://screenity.io
```

## Best Setup For This Project

Use this setup:

```text
Recording: OBS Studio
Editing: Clipchamp or Canva
Final format: MP4
Video length: 5 to 7 minutes
Resolution: 1080p
```

## Before Recording Checklist

### 1. Check Backend

Open terminal:

```bash
cd backend
./setup_and_run.sh
```

Check backend URL:

```text
http://127.0.0.1:8000
```

Expected result:

```json
{"Ping":"Pong"}
```

### 2. Check Frontend

Open another terminal:

```bash
cd frontend
./setup_and_run.sh
```

Open:

```text
http://localhost:3000
```

Check that:

- toolbar is visible
- canvas is visible
- nodes can be dragged
- submit button is visible

### 3. Check API Connection

Create a simple pipeline:

```text
Input -> Text -> Output
```

Click:

```text
Submit Pipeline
```

Check modal shows:

- number of nodes
- number of edges
- DAG status

### 4. Check Text Node Variables

In the Text node, type:

```text
Hello {{name}}, summarize {{document}}
```

Check:

- `name` handle appears
- `document` handle appears
- duplicate handles are not created

### 5. Check Workflow Name

At the top-left, edit workflow name:

```text
Customer Email Automation
```

Refresh browser.

Check:

- workflow name still appears

### 6. Check Node Delete

Add one node.

Click:

```text
Delete
```

Check:

- node is removed
- connected edges are also removed

### 7. Check Invalid DAG

Create a cycle:

```text
Input -> Text
Text -> Input
```

Submit.

Check:

```text
Is DAG: No
```

This is important because it proves backend graph validation works.

## Screen Recording Checklist

Before starting OBS:

- close unnecessary browser tabs
- hide personal files
- turn off notifications
- keep VS Code clean
- increase browser zoom if needed
- keep terminal text readable
- use full-screen browser or clean window
- test microphone
- keep water nearby
- prepare script file

Recommended browser zoom:

```text
90% or 100%
```

Recommended screen resolution:

```text
1920 x 1080
```

## Audio Checklist

Before recording:

- test microphone
- record 10 seconds sample
- play it back
- check voice is clear
- avoid fan noise
- avoid keyboard noise

Speak slowly.

Do not rush.

## Best Video Flow

Use this order:

### 1. Introduction

Say:

```text
Hello, my name is Praveen Sanpada. I am a Software Development Specialist with experience in backend systems, AI workflows, FastAPI, React, LLMs, and RAG pipelines.
```

### 2. Project Overview

Say:

```text
This project is a visual workflow builder where users can add nodes, connect them, create dynamic text variables, and validate the pipeline from a FastAPI backend.
```

### 3. Show UI

Show:

- toolbar
- canvas
- node cards
- workflow name
- submit modal

### 4. Create Simple Pipeline

Create:

```text
Input -> Text -> LLM -> Output
```

Text node:

```text
Answer this question: {{question}}
```

Submit and show result.

### 5. Show Text Node Variable Feature

Type:

```text
Hello {{name}}, summarize {{document}}
```

Show handles appear automatically.

### 6. Show DAG Validation

Explain:

```text
The backend treats nodes and edges as a directed graph and checks whether the graph has a cycle.
```

### 7. Show Final Workflow

Create or show:

```text
[Input] + [PDF Loader] + [API] + [Database] -> [Text] -> [LLM] -> [Summarizer] -> [Email] -> [Output]
```

### 8. Closing

Say:

```text
This project demonstrates reusable React node architecture, dynamic Text node logic, FastAPI integration, and correct DAG validation with clean practical architecture.
```

## Video Length Plan

```text
0:00 - 0:45   Introduction
0:45 - 1:30   Project overview
1:30 - 2:30   UI walkthrough
2:30 - 3:30   Create pipeline
3:30 - 4:30   Text node variables
4:30 - 5:30   Backend and DAG validation
5:30 - 6:30   Final workflow example
6:30 - 7:00   Closing
```

## OBS Basic Settings

Open OBS.

Set:

```text
Source: Display Capture or Window Capture
Audio: Microphone
Output format: MP4
Resolution: 1920x1080
FPS: 30
```

Recording path:

```text
Videos/VectorShift-Demo.mp4
```

## What To Avoid

Avoid:

- recording with broken backend
- showing `.env` file
- showing GitHub tokens or private keys
- too many browser tabs
- long silence
- moving mouse too fast
- reading every line of code
- over-explaining small details
- making the video longer than 7 minutes

## Final Pre-Submit Checklist

Before sending video:

- video opens correctly
- audio is clear
- screen is readable
- app runs correctly
- DAG result is visible
- Text node variable handles are visible
- no secret `.env` is shown
- video length is 5 to 7 minutes
- file format is MP4

## Best File Name

Use this file name:

```text
Praveen_Sanpada_VectorShift_Demo.mp4
```

## Final Recommendation

Use:

```text
OBS Studio for recording
Clipchamp for trimming
MP4 for final export
```

Keep the video simple, clean, and confident.
