from typing import Any

from pydantic import BaseModel, Field


class PipelineNode(BaseModel):
    id: str
    type: str | None = None
    position: dict[str, float] | None = None
    data: dict[str, Any] = Field(default_factory=dict)


class PipelineEdge(BaseModel):
    source: str
    target: str
    id: str | None = None
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelinePayload(BaseModel):
    nodes: list[PipelineNode] = Field(default_factory=list)
    edges: list[PipelineEdge] = Field(default_factory=list)


class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
