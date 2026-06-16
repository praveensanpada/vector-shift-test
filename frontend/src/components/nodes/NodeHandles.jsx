import { Handle, Position } from "reactflow";

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const NodeHandles = ({ connectedHandles = new Set(), handles = [] }) => {
  return (
    <>
      {handles.map((handle) => {
        const position = positionMap[handle.position] || handle.position || Position.Left;
        const style = handle.top ? { top: handle.top } : undefined;
        const labelStyle = handle.top ? { top: handle.top } : { top: "50%" };
        const normalizedPosition = String(position).toLowerCase();

        return (
          <div key={`${handle.type}-${handle.id}`}>
            <Handle
              className={`node-handle ${connectedHandles.has(handle.id) ? "node-handle--connected" : ""}`}
              id={handle.id}
              type={handle.type}
              position={position}
              style={style}
            />
            {handle.label ? (
              <span
                className={`node-handle-label node-handle-label--${normalizedPosition}`}
                style={labelStyle}
              >
                {handle.label}
              </span>
            ) : null}
          </div>
        );
      })}
    </>
  );
};
