import { expect, test, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { LocalizationContext } from "../context/context";
import { SetStateAction, Dispatch } from "react";
import { BrowserRouter } from "react-router-dom";

test("Header component", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  expect(getByText("Go to Welcome page")).toBeInTheDocument();

  const localizationButton = getByText("Localization");
  await fireEvent.click(localizationButton);
  expect(setLocalization).toHaveBeenCalledWith("ru");
});

test("Header component2", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { getByText } = render(
    <LocalizationContext.Provider
      value={{ Localization: "ru", setLocalization }}
    >
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );
  const localizationButton = getByText("Локализация");
  await fireEvent.click(localizationButton);
  expect(setLocalization).toHaveBeenCalledWith("en");
});

test("Header component sticky header", async () => {
  const setLocalization: Dispatch<SetStateAction<string | undefined>> = vi.fn();
  const { container } = render(
    <LocalizationContext.Provider
      value={{ Localization: "en", setLocalization }}
    >
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </LocalizationContext.Provider>,
  );

  expect(container.firstElementChild?.classList.contains("sticky")).toBe(false);

  await fireEvent.scroll(window, { target: { scrollY: 1 } });

  expect(container.firstElementChild?.classList.contains("sticky")).toBe(true);
});
