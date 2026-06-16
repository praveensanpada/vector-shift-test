import { PIPELINE_API_BASE_URL } from "../styles/theme";
import { serializePipeline } from "../utils/nodeHelpers";

export const parsePipeline = async ({ nodes, edges }) => {
  const response = await fetch(`${PIPELINE_API_BASE_URL}/pipelines/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serializePipeline({ nodes, edges })),
  });

  if (!response.ok) {
    throw new Error(`Pipeline parser returned ${response.status}`);
  }

  return response.json();
};
