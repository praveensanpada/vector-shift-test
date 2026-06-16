export const DraggableNode = ({ type, label, tone = "default" }) => {
  const handleDragStart = (event) => {
    event.currentTarget.style.cursor = "grabbing";
    event.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`draggable-node draggable-node--${tone}`}
      draggable
      role="button"
      tabIndex={0}
      aria-label={`Drag ${label} node onto canvas`}
      onDragStart={handleDragStart}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = "grab";
      }}
    >
      <span className="draggable-node__mark">{label.slice(0, 1)}</span>
      <span>{label}</span>
    </div>
  );
};
