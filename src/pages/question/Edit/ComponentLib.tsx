import { FC } from "react";
import {
  ComponentConfGroup,
  ComponentConfType,
} from "../../../components/QuestionComponents";
import { Typography } from "antd";
import styled from "./ComponentLib.module.scss";
import { addComponent } from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const { Title } = Typography;
const Lib: FC = () => {
  const dispatch = useDispatch();
  function genComponent(c: ComponentConfType) {
    const { type, Component, title, defaultProps } = c;
    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(5),
          type,
          title,
          props: defaultProps,
        }),
      );
    }

    return (
      <div key={type} className={styled.wrapper} onClick={handleClick}>
        <div className={styled.componet}>
          <Component />
        </div>
      </div>
    );
  }
  return (
    <div>
      {ComponentConfGroup.map((group, index) => {
        const { grounId, groupName, components } = group;
        return (
          <div key={grounId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : 0 }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Lib;
