import Component from "./Component";
import { render, screen } from "@testing-library/react";

test("默认属性", () => {
  render(<Component />);
  const p = screen.getByText("请输入标题");
  expect(p).toBeInTheDocument();
  const input = screen.getByPlaceholderText("请输入");
  expect(input).toBeInTheDocument();
});

test("传入属性", () => {
  render(<Component title="hello" placeholder="word" />);
  const p = screen.getByText("hello");
  expect(p).toBeInTheDocument();
  const input = screen.getByPlaceholderText("word");
  expect(input).toBeInTheDocument();
});
