import { FC, useCallback } from "react";
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
  // 生成组件
  function genComponent(c: ComponentConfType) {
    // 获取组件配置 QuestionComponents里面的组件配置
    // Component 代表一个组件，defaultProps 代表组件的默认属性
    // type 代表组件类型，title 代表组件标题
    const { type, Component, title, defaultProps } = c;

    // 点击组件时候利用redux dispatch给画布新增组件
    // 使用useCallback 避免每次点击组件都重新生成函数
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleClick = useCallback(() => {
      dispatch(
        addComponent({
          fe_id: nanoid(5),
          type,
          title,
          props: defaultProps,
        }),
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // function handleClick() {
    //   dispatch(
    //     addComponent({
    //       fe_id: nanoid(5),
    //       type,
    //       title,
    //       props: defaultProps,
    //     }),
    //   );
    // }

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
      {/* 左侧组件列表 */}
      {ComponentConfGroup.map((group, index) => {
        // 分组 components 组件列表
        const { grounId, groupName, components } = group;
        return (
          <div key={grounId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : 0 }}
            >
              {groupName}
            </Title>
            {/*  组件列表 */}
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Lib;
