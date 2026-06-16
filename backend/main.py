import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from graph_utils import analyze_pipeline
from schemas import PipelineParseResponse, PipelinePayload


def load_env_file(path=".env"):
    if not os.path.exists(path):
        return

    with open(path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_env_file()

app = FastAPI(title="VectorShift Pipeline Parser")

frontend_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineParseResponse)
def parse_pipeline(payload: PipelinePayload):
    return analyze_pipeline(payload)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("BACKEND_HOST", "127.0.0.1"),
        port=int(os.getenv("BACKEND_PORT", "8000")),
        reload=True,
    )
