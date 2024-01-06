import { test, vi, expect } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { GraphQLClient } from "graphql-request";
import GraphQL from "./GraphQL";
import { LocalizationContext } from "../context/context";
import { SetStateAction, Dispatch } from "react";
import { BrowserRouter } from "react-router-dom";

test("GraphQL component", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const mockRequest = vi.fn();
  GraphQLClient.prototype.request = mockRequest;
  mockRequest.mockResolvedValue({ data: "mockData" });

  const { getByLabelText, getByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  const endpointInput = getByLabelText("Конечная точка");
  const queryInput = getByLabelText("Запрос");
  const submitButton = getByText("Отправить");

  fireEvent.change(endpointInput, { target: { value: "https://test.com" } });
  fireEvent.change(queryInput, { target: { value: "{ test }" } });
  fireEvent.click(submitButton);

  await waitFor(() => expect(mockRequest).toHaveBeenCalled());
});

test("GraphQL component - error handling", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const mockRequest = vi.fn();
  GraphQLClient.prototype.request = mockRequest;
  const error = new Error("Network error");
  mockRequest.mockRejectedValue(error);

  const { getByLabelText, getByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  const endpointInput = getByLabelText("Конечная точка");
  const queryInput = getByLabelText("Запрос");
  const submitButton = getByText("Отправить");

  fireEvent.change(endpointInput, { target: { value: "https://test.com" } });
  fireEvent.change(queryInput, { target: { value: "{ test }" } });
  fireEvent.click(submitButton);

  await waitFor(() => expect(mockRequest).toHaveBeenCalled());
  expect(getByText("{}")).toBeInTheDocument();
});

test("GraphQL component - toggle visibility", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByText, getAllByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  const documentationButton = getByText("Документация");
  fireEvent.click(documentationButton);
  expect(getByText("Loading...")).toBeInTheDocument();

  const headersButton = getAllByText("Заголовки");
  fireEvent.click(headersButton[1]);
  expect(getAllByText("Заголовки")[0]).toBeInTheDocument();

  const variablesButton = getAllByText("Переменные");
  fireEvent.click(variablesButton[1]);
  expect(getAllByText("Переменные")[0]).toBeInTheDocument();
});

test("GraphQL component - toggle visibility en", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByText, getAllByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  const documentationButton = getByText("Documentation");
  fireEvent.click(documentationButton);
  expect(getByText("Loading...")).toBeInTheDocument();

  const headersButton = getAllByText("Headers");
  fireEvent.click(headersButton[1]);
  expect(getAllByText("Headers")[0]).toBeInTheDocument();

  const variablesButton = getAllByText("Variables");
  fireEvent.click(variablesButton[1]);
  expect(getAllByText("Variables")[0]).toBeInTheDocument();
});

test("GraphQL component - handleEndpointChange", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByLabelText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  const endpointInput = getByLabelText("Конечная точка");
  fireEvent.change(endpointInput, { target: { value: "https://test.com" } });
  expect((endpointInput as HTMLInputElement).value).toBe("https://test.com");
});

test("GraphQL component - handleQueryChange", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByLabelText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  const queryInput = getByLabelText("Запрос");
  fireEvent.change(queryInput, { target: { value: "{ test }" } });
  expect((queryInput as HTMLInputElement).value).toBe("{ test }");
});

test("GraphQL component - handleVariablesChange", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByLabelText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  const variablesInput = getByLabelText("Переменные");
  fireEvent.change(variablesInput, { target: { value: '{"test": "value"}' } });
  expect((variablesInput as HTMLInputElement).value).toBe('{"test": "value"}');
});

test("GraphQL component - handleHeadersChange", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByLabelText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  const headersInput = getByLabelText("Заголовки");
  fireEvent.change(headersInput, { target: { value: '{"header": "value"}' } });
  expect((headersInput as HTMLInputElement).value).toBe('{"header": "value"}');
});

test("GraphQL component - handleSubmit", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByLabelText, getByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  const endpointInput = getByLabelText("Конечная точка");
  const queryInput = getByLabelText("Запрос");
  const submitButton = getByText("Отправить");

  fireEvent.change(endpointInput, { target: { value: "https://test.com" } });
  fireEvent.change(queryInput, { target: { value: "{ test }" } });
  fireEvent.click(submitButton);
});

test("GraphQL component - prettifyQuery", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByLabelText, getByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <GraphQL />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  const queryInput = getByLabelText("Запрос");
  const prettifyButton = getByText("Форматировать запрос");

  fireEvent.change(queryInput, { target: { value: "{test}" } });
  fireEvent.click(prettifyButton);
});
