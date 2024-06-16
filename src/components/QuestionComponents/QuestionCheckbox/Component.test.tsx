import { render, screen } from "@testing-library/react";
import Component from "./Component";

test("默认属性", () => {
  render(<Component />);

  const p = screen.getByText("多选标题");
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`${i}`);
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();

    expect(checkbox.getAttribute("checked")).toBeNull(); // 每一个Checkbox 默认状态为未选中
  }
});

test("传入属性", () => {
  const opts = [
    { value: "v1", text: "t1", checked: false },
    { value: "v2", text: "t2", checked: false },
    { value: "v3", text: "t3", checked: false },
  ];
  render(<Component title="hello" list={opts} />);

  const p = screen.getByText("hello");
  expect(p).toBeInTheDocument();

  opts.forEach((opt) => {
    const checkbox = screen.getByDisplayValue(opt.value);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.getAttribute("checked")).toBeNull(); // 未选中
  });
});
