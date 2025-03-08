import Component from "./Component";
import { render, screen } from "@testing-library/react";
test("默认属性", () => {
  render(<Component />);
  const h = screen.getByText("一行标题");
  expect(h).toBeInTheDocument(); // 断言
});

test("传入属性", () => {
  render(<Component text="标题1" level={2} isCenter={true} />);
  const h = screen.getByText("标题1");
  expect(h).toBeInTheDocument();
  expect(h.matches("h2")).toBeTruthy(); // <h2>
  const style = h.style;
  expect(style.textAlign).toBe("center");
});
