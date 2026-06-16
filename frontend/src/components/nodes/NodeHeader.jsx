export const NodeHeader = ({ title, subtitle, tone = "default" }) => {
  return (
    <div className="node-header">
      <div className={`node-icon node-icon--${tone}`}>{title.slice(0, 1)}</div>
      <div>
        <div className="node-title">{title}</div>
        {subtitle ? <div className="node-subtitle">{subtitle}</div> : null}
      </div>
    </div>
  );
};
