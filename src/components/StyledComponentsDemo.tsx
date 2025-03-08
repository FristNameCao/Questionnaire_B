import { FC } from "react";
import styled from "styled-components";

// interface ButtonProps
//   extends ExecutionContext,
//     DetailedHTMLProps<
//       ButtonHTMLAttributes<HTMLButtonElement>,
//       HTMLButtonElement
//     > {
//   primary?: boolean;
// }
interface ButtonProps {
  primary?: boolean;
}

// Button 组件
const Button = styled.button<{ primary?: boolean }>`
  background: ${(props: ButtonProps) => (props.primary ? "#BF4F74" : "white")};
  color: ${(props) => (props.primary ? "white" : "#BF4F74")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReversedButton = (props: any) => (
  // eslint-disable-next-line react/no-children-prop
  <Button {...props} children={props.children.split("").reverse()} />
);

const StyledComponentsDemo: FC = () => {
  return (
    <div>
      <Button primary={true}>Button</Button>
      <Button primary={false}>Button</Button>
      <TomatoButton primary={true}>Tomato Button</TomatoButton>
      <TomatoButton primary={false}>Tomato Button</TomatoButton>
      <ReversedButton>123</ReversedButton>
    </div>
  );
};

export default StyledComponentsDemo;
