export function Field({ children }) {
  return <div style={{ marginBottom: "10px" }}>{children}</div>;
}

export function FieldLabel({ children }) {
  return <label>{children}</label>;
}

export function FieldDescription({ children }) {
  return <p style={{ fontSize: "12px" }}>{children}</p>;
}

export function FieldGroup({ children }) {
  return <div>{children}</div>;
}
``