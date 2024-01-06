import { test, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DocumentationExplorer from "./documentation";
import { LocalizationContext } from "../context/context";
import { SetStateAction, Dispatch } from "react";
import { BrowserRouter } from "react-router-dom";

test("renders loading state initially", () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <DocumentationExplorer sdlEndpoint="https://rickandmortyapi.com/graphql" />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders error state when fetch fails", async () => {
  global.fetch = vi.fn(() => Promise.reject("Fetch failed"));

  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <DocumentationExplorer sdlEndpoint="https://rickandmortyapi.com/graphql" />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  await screen.findByText(/No documentation available/i);
});

test("renders documentation when fetch is successful", async () => {
  const mockSuccessResponse = { data: "mockData" };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  });
  global.fetch = vi.fn().mockImplementation(() => mockFetchPromise);

  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <DocumentationExplorer sdlEndpoint="https://rickandmortyapi.com/graphql" />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  await screen.findByText(/mockData/i);
});
