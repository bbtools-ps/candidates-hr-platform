import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vite-plus/test";
import ThemeSwitcher from "./ThemeSwitcher";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("<ThemeSwitcher/>", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");

    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    );

    const colorSchemeMeta = document.createElement("meta");
    colorSchemeMeta.name = "color-scheme";
    colorSchemeMeta.content = "light dark";
    document.head.append(colorSchemeMeta);
  });

  afterEach(() => {
    document.head
      .querySelectorAll('meta[name="color-scheme"]')
      .forEach((element) => element.remove());
    vi.unstubAllGlobals();
  });

  it("toggles the rendered theme and returns to the system preference", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const switchButton = screen.getByRole("switch");

    expect(switchButton).toHaveAccessibleName("SwitchToDarkTheme_Label");
    expect(switchButton).toHaveAttribute("aria-checked", "false");

    await user.click(switchButton);

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(switchButton).toHaveAccessibleName("SwitchToLightTheme_Label");
    expect(switchButton).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement).toHaveClass("dark");
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')
    ).toHaveProperty("content", "dark");

    await user.click(switchButton);

    expect(localStorage.getItem("theme")).toBeNull();
    expect(switchButton).toHaveAttribute("aria-checked", "false");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')
    ).toHaveProperty("content", "light dark");
  });

  it("keeps multiple switchers synchronized", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ThemeSwitcher />
        <ThemeSwitcher />
      </>
    );

    const switches = screen.getAllByRole("switch");
    await user.click(switches[0]);

    switches.forEach((switchButton) => {
      expect(switchButton).toHaveAttribute("aria-checked", "true");
    });
  });
});
