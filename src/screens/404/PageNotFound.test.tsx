import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, it } from "vitest";
import PageNotFound from "./PageNotFound";

describe("<PageNotFound/>", () => {
  it('should render the heading with the text "Page not found" and the link with the text "Go back home"', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Page not found");
    expect(screen.getByRole("link")).toHaveTextContent(/go back home/i);
  });
});
