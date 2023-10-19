import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TagsInput from "./TagsInput";

describe("<TagsInput />", () => {
  const testTags = [
    { id: "1", value: "Adobe Photoshop" },
    { id: "2", value: "CSS" },
  ];

  it("should render list of tags that are passed as a prop", () => {
    render(
      <TagsInput
        id=""
        value=""
        tags={testTags}
        label=""
        onBlur={() => {}}
        onChange={() => {}}
        onKeyUp={() => {}}
        onRemoveTags={() => {}}
      />
    );

    for (const { value } of testTags) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it("should render a value that is passed as a prop", () => {
    render(
      <TagsInput
        id=""
        value="test"
        tags={[]}
        label=""
        onBlur={() => {}}
        onChange={() => {}}
        onKeyUp={() => {}}
        onRemoveTags={() => {}}
      />
    );

    expect(screen.getByRole("textbox")).toHaveValue("test");
  });

  it("should render the label that is passed as a prop", () => {
    render(
      <TagsInput
        id=""
        value="test"
        tags={[]}
        label="test label"
        onBlur={() => {}}
        onChange={() => {}}
        onKeyUp={() => {}}
        onRemoveTags={() => {}}
      />
    );

    expect(screen.getByText("test label")).toBeInTheDocument();
  });

  it("should call onBlur handler when the input is blurred out", async () => {
    const blurHandler = vi.fn();
    render(
      <TagsInput
        id=""
        value=""
        tags={[]}
        label=""
        onBlur={blurHandler}
        onChange={() => {}}
        onKeyUp={() => {}}
        onRemoveTags={() => {}}
      />
    );

    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.tab();

    expect(blurHandler).toHaveBeenCalled();
  });

  it("should call onChange handler when the input is typed", async () => {
    const changeHandler = vi.fn();
    render(
      <TagsInput
        id=""
        value=""
        tags={[]}
        label=""
        onBlur={() => {}}
        onChange={changeHandler}
        onKeyUp={() => {}}
        onRemoveTags={() => {}}
      />
    );

    await userEvent.type(screen.getByRole("textbox"), "test");

    expect(changeHandler).toHaveBeenCalled();
  });

  it("should call onRemoveTags when a tag is removed by clicking X icon on the button", async () => {
    const removeHandler = vi.fn();
    render(
      <TagsInput
        id=""
        value=""
        tags={testTags}
        label=""
        onBlur={() => {}}
        onChange={() => {}}
        onKeyUp={() => {}}
        onRemoveTags={removeHandler}
      />
    );

    await userEvent.click(screen.getAllByRole("button")[0]);

    expect(removeHandler).toHaveBeenCalled();
  });
});
