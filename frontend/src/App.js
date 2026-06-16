import { PipelineCanvas } from "./components/PipelineCanvas";
import { PipelineToolbar } from "./components/PipelineToolbar";
import { SubmitPanel } from "./components/SubmitPanel";

function App() {
  return (
    <main className="app-shell">
      <PipelineToolbar />
      <PipelineCanvas />
      <SubmitPanel />
    </main>
  );
}

export default App;
