import { expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./Login";
import { LocalizationContext } from "../context/context";
import { SetStateAction, Dispatch } from "react";
import { BrowserRouter } from "react-router-dom";

test("LoginPage", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  const emailInput = screen.getByPlaceholderText(/E-mail Address/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByDisplayValue(/Login/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(loginButton);
});
