export const NodeField = ({ field, value, onChange }) => {
  const commonProps = {
    id: field.name,
    name: field.name,
    value,
    placeholder: field.placeholder,
    onChange: (event) => onChange(field.name, event.target.value),
    className: "node-control",
  };

  return (
    <label className="node-field">
      <span>{field.label}</span>
      {field.type === "textarea" ? (
        <textarea
          {...commonProps}
          className="node-control node-control--textarea"
          rows={field.rows || 3}
        />
      ) : field.type === "select" ? (
        <select {...commonProps}>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={field.type || "text"} {...commonProps} />
      )}
    </label>
  );
};
