from collections import deque

try:
    import networkx as nx
except ModuleNotFoundError:
    nx = None

from schemas import PipelineEdge, PipelinePayload


def count_nodes(payload: PipelinePayload) -> int:
    return len(payload.nodes)


def count_edges(payload: PipelinePayload) -> int:
    return len(payload.edges)


def _node_ids_from_payload(payload: PipelinePayload) -> set[str]:
    node_ids = {node.id for node in payload.nodes}

    for edge in payload.edges:
        node_ids.add(edge.source)
        node_ids.add(edge.target)

    return node_ids


def _is_dag_with_topological_sort(node_ids: set[str], edges: list[PipelineEdge]) -> bool:
    adjacency = {node_id: [] for node_id in node_ids}
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        adjacency.setdefault(edge.source, [])
        adjacency.setdefault(edge.target, [])
        indegree.setdefault(edge.source, 0)
        indegree.setdefault(edge.target, 0)
        adjacency[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque(node_id for node_id, degree in indegree.items() if degree == 0)
    visited_count = 0

    while queue:
        node_id = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(indegree)


def is_dag(payload: PipelinePayload) -> bool:
    node_ids = _node_ids_from_payload(payload)

    if nx is None:
        return _is_dag_with_topological_sort(node_ids, payload.edges)

    graph = nx.DiGraph()
    graph.add_nodes_from(node_ids)
    graph.add_edges_from((edge.source, edge.target) for edge in payload.edges)
    return nx.is_directed_acyclic_graph(graph)


def analyze_pipeline(payload: PipelinePayload) -> dict[str, int | bool]:
    return {
        "num_nodes": count_nodes(payload),
        "num_edges": count_edges(payload),
        "is_dag": is_dag(payload),
    }
