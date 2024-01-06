import { expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationPage from "./Registration";
import { LocalizationContext } from "../context/context";
import { SetStateAction, Dispatch } from "react";
import { BrowserRouter } from "react-router-dom";

test("RegistrationPage", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  const nameInput = screen.getByPlaceholderText(/Full Name/i);
  const emailInput = screen.getByPlaceholderText(/E-mail Address/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const registerButton = screen.getByDisplayValue(/Send/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: "Test User" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(registerButton);
});
