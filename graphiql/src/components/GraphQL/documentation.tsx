import React, { useState, useEffect } from "react";
import { useLocalizationContext } from "../context/context";

interface DocumentationExplorerProps {
  sdlEndpoint: string;
}

const DocumentationExplorer: React.FC<DocumentationExplorerProps> = ({
  sdlEndpoint,
}) => {
  const [documentation, setDocumentation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { Localization } = useLocalizationContext();

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const response = await fetch(sdlEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
          query IntrospectionQuery {
            __schema {
              types {
                name
                kind
                description
                fields {
                  name
                  description
                  type {
                    name
                    kind
                  }
                }
              }
            }
          }
        `,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDocumentation(JSON.stringify(data, null, 2));
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error fetching documentation: ${error.message}`);
        }
        setLoading(false);
      }
    };

    fetchDocumentation();
  }, [sdlEndpoint]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!documentation) {
    return <div>No documentation available</div>;
  }

  return (
    <div>
      {Localization === "en" ? <h2>Documentation</h2> : <h2>Документация</h2>}
      <pre className="DocumentationJSON">{documentation}</pre>
    </div>
  );
};

export default DocumentationExplorer;
