import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/localization/i);
  expect(linkElement).toBeInTheDocument();
});

test("changes localization state", async () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /localization/i });
  userEvent.click(button);
  expect(screen.getByText(/localization/i)).toBeInTheDocument();
});
