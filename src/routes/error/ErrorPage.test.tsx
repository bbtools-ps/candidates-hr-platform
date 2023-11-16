import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";

describe("<PageNotFound/>", () => {
  it('should render the heading with the text "Page not found" and the link with the text "Go back home"', () => {
    render(<ErrorPage />, { wrapper: BrowserRouter });

    expect(screen.getByRole("heading")).toHaveTextContent(/error occured/i);
    expect(screen.getByRole("link")).toHaveTextContent(/go back home/i);
  });
});
