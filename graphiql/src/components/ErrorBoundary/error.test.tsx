import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import ErrorBoundary from "./Error";

test("renders without crashing", () => {
  const { getByText } = render(
    <ErrorBoundary>
      <h1>Hello, world!</h1>
    </ErrorBoundary>,
  );

  expect(getByText("Hello, world!")).toBeInTheDocument();
});

test("renders error message on error", () => {
  const ErrorComponent = () => {
    throw new Error("Test error");
  };

  const { getByText } = render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>,
  );

  expect(getByText("Sorry.. there was an error")).toBeInTheDocument();
});
