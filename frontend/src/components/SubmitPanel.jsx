import { useCallback, useEffect, useState } from "react";
import { parsePipeline } from "../services/pipelineApi";
import { useStore } from "../store";

export const SubmitPanel = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));
  const workflowName = useStore((state) => state.workflowName.trim() || "Untitled pipeline");
  const resetPipeline = useStore((state) => state.resetPipeline);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeDialog = useCallback(() => {
    setResult(null);
    setError("");
  }, []);

  useEffect(() => {
    if (!result && !error) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [result, error, closeDialog]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    setResult(null);

    try {
      setResult(await parsePipeline({ nodes, edges }));
    } catch (submitError) {
      setError(submitError.message || "Unable to analyze pipeline");
    } finally {
      setIsSubmitting(false);
    }
  };

  const connectedNodeIds = new Set(edges.flatMap((edge) => [edge.source, edge.target]));
  const hasDisconnectedNodes = nodes.some((node) => !connectedNodeIds.has(node.id));
  const hasNoConnections = edges.length === 0;
  const graphWarning = hasNoConnections
    ? "No connections yet"
    : hasDisconnectedNodes
      ? "Some nodes are disconnected"
      : "";
  const modalState = error ? "error" : result?.is_dag && !graphWarning ? "success" : "warning";
  const statusLabel = !result?.is_dag
    ? "Cycle detected"
    : graphWarning || "Ready to run";
  const statusValue = !result?.is_dag
    ? "Needs review"
    : graphWarning
      ? "Acyclic, incomplete"
      : "Valid DAG";

  return (
    <>
      <footer className="submit-bar">
        <div className="submit-summary">
          <span>{workflowName}</span>
          <div>
            <strong>{nodes.length}</strong> nodes
            <span aria-hidden="true"> / </span>
            <strong>{edges.length}</strong> edges
          </div>
        </div>
        <button className="submit-button" type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Analyzing..." : "Submit Pipeline"}
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={resetPipeline}
          disabled={isSubmitting || (nodes.length === 0 && edges.length === 0)}
        >
          Reset
        </button>
      </footer>

      {result || error ? (
        <div className="modal-backdrop" role="presentation" onClick={closeDialog}>
          <section
            className={`analysis-modal analysis-modal--${modalState}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="analysis-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Pipeline Analysis</p>
                <h2 id="analysis-modal-title">Validation Result</h2>
                <p className="modal-subtitle">{workflowName}</p>
              </div>
              <button className="modal-close" type="button" onClick={closeDialog} aria-label="Close">
                Close
              </button>
            </div>

            {error ? (
              <div className="modal-error" role="alert">{error}</div>
            ) : (
              <>
                <div className={`analysis-status analysis-status--${modalState}`}>
                  <span>{statusLabel}</span>
                  <strong>{statusValue}</strong>
                </div>
                <div className="analysis-grid" aria-live="polite">
                <div>
                  <span>Number of Nodes</span>
                  <strong>{result.num_nodes}</strong>
                </div>
                <div>
                  <span>Number of Edges</span>
                  <strong>{result.num_edges}</strong>
                </div>
                <div>
                  <span>Is DAG</span>
                  <strong className={result.is_dag ? "status-positive" : "status-negative"}>
                    {result.is_dag ? "Yes" : "No"}
                  </strong>
                </div>
              </div>
              </>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
};
