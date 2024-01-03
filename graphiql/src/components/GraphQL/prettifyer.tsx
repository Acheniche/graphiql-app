import React from "react";

interface JSONPrettyProps {
  data: Record<string, unknown> | null;
}

const ResponseJSON: React.FC<JSONPrettyProps> = ({ data }) => {
  if (data === null) {
    return <div>Data is null</div>;
  }

  const stringifyObject = (
    obj: Record<string, unknown>,
    indent: number = 2,
  ): string => {
    const spaces = " ".repeat(indent);
    return Object.entries(obj)
      .map(
        ([key, value]) =>
          `${spaces}"${key}": ${
            isObject(value)
              ? stringifyObject(value as Record<string, unknown>, indent + 2)
              : JSON.stringify(value)
          }`,
      )
      .join(",\n");
  };

  const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  };

  return (
    <pre>
      {"{\n"}
      {stringifyObject(data)}
      {"\n}"}
    </pre>
  );
};

export default ResponseJSON;
