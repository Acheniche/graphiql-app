import React, { SetStateAction, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { parse, print } from "graphql";
import JSONPretty from "react-json-pretty";
import { useLocalizationContext } from "../context/context";
import "./GraphQL.css";

const defaultEndpoint = "https://rickandmortyapi.com/graphql";

const GraphQL: React.FC = () => {
  const [endpoint, setEndpoint] = useState(defaultEndpoint);
  const [query, setQuery] = useState("");
  const [variables, setVariables] = useState({});
  const [headers, setHeaders] = useState({});
  const [response, setResponse] = useState(null);
  const { Localization } = useLocalizationContext();

  const handleEndpointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleVariablesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    try {
      const parsedVariables = JSON.parse(event.target.value);
      setVariables(parsedVariables);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHeadersChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    try {
      const parsedHeaders = JSON.parse(event.target.value);
      setHeaders(parsedHeaders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const client = new GraphQLClient(endpoint, { headers });
    try {
      const data: SetStateAction<null> = await client.request(query, variables);
      setResponse(data);
    } catch (error) {
      setResponse(error as SetStateAction<null>);
    }
  };

  const prettifyQuery = () => {
    try {
      const parsedQuery = parse(query, { noLocation: true });
      const prettifiedQuery = print(parsedQuery);
      setQuery(prettifiedQuery);
    } catch (error) {
      console.error("Error parsing or formatting GraphQL query:", error);
    }
  };

  return (
    <div className="GraphQL">
      <form onSubmit={handleSubmit}>
        <div className="control">
          {Localization === "en" ? (
            <label htmlFor="endpoint">Endpoint</label>
          ) : (
            <label htmlFor="endpoint">Конечная точка</label>
          )}
          <input
            id="endpoint"
            type="text"
            value={endpoint}
            onChange={handleEndpointChange}
          />
        </div>
        <div className="control">
          {Localization === "en" ? (
            <label htmlFor="query">Query</label>
          ) : (
            <label htmlFor="query">Запрос</label>
          )}
          <textarea
            id="query"
            rows={10}
            cols={50}
            value={query}
            onChange={handleQueryChange}
          />
          {Localization === "en" ? (
            <button onClick={prettifyQuery}>Format Query</button>
          ) : (
            <button onClick={prettifyQuery}>Форматировать запрос</button>
          )}
        </div>
        <div className="control">
          {Localization === "en" ? (
            <label htmlFor="variables">Variables</label>
          ) : (
            <label htmlFor="variables">Переменные</label>
          )}
          <textarea
            id="variables"
            rows={5}
            cols={50}
            onChange={handleVariablesChange}
          />
        </div>
        <div className="control">
          {Localization === "en" ? (
            <label htmlFor="headers">Headers</label>
          ) : (
            <label htmlFor="headers">Заголовки</label>
          )}
          <textarea
            id="headers"
            rows={5}
            cols={50}
            onChange={handleHeadersChange}
          />
        </div>
        {Localization === "en" ? (
          <button type="submit">Send</button>
        ) : (
          <button type="submit">Отправить</button>
        )}
      </form>
      <div className="response">
        {Localization === "en" ? <label>Response</label> : <label>Ответ</label>}
        <JSONPretty data={response} />
      </div>
    </div>
  );
};

export default GraphQL;
