import { render, screen } from "@testing-library/react";
import Component from "./Component";

test("默认属性", () => {
  render(<Component />); //渲染组件
  const h = screen.getByText("问卷标题");
  expect(h).toBeInTheDocument(); // 断言
});

test("自定义属性", () => {
  render(<Component title="自定义标题" desc={"自定义描述"} />);
  const h = screen.getByText("自定义标题");
  expect(h).toBeInTheDocument();
  const p = screen.getByText("自定义描述");
  expect(p).toBeInTheDocument();
});

test("多行文字", () => {
  render(<Component title="自定义标题" desc={"a\nb\nc"} />);
  const span = screen.getByText("a");
  expect(span).toBeInTheDocument();
  expect(span).toHaveTextContent("a");
  expect(span).not.toHaveTextContent("ab"); // 是否被换行了
});
