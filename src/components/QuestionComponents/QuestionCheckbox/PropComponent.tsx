import { OptionType, QuestionCheckboxPropsType } from "./interface";
import { FC, useEffect } from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";

const PropsComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const { title, isVertical, list = [], onChange, disable } = props;
  const [form] = Form.useForm();
  function handleValuesChange() {
    const values = form.getFieldsValue();

    if (values.list) {
      // 需要清除掉text indefined空的选项
      values.list = values.list.filter(
        (item: { text: null }) => !(item.text == null),
      );
    }

    // 遍历所有的选项，如果value为空，则补齐
    const { list = [] } = values;
    list.forEach((option: OptionType) => {
      if (option.value === "") {
        // 值不能为空 补齐value
        option.value = nanoid(5);
      }
    });
    onChange?.(values);
  }

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      list,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, isVertical, list]);
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      disabled={disable}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的可能选项（可删除） */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前 formitem获取的是当前这一个的 text */}
                    <Form.Item name={[name, "checked"]} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((item: OptionType) => {
                              if (item.text === text) {
                                num++; // 记录text相同的个数，预期只有一个，那就是自己
                              }
                            });
                            if (num > 1) return Promise.reject("选项重复");
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {/* 当前选项删除按钮 */}
                    {index > 0 && (
                      <Button
                        type="link"
                        icon={<MinusCircleOutlined />}
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    )}
                  </Space>
                );
              })}
              {/* 添加按钮 */}
              <Form.Item>
                <Button
                  type="link"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => {
                    add({ text: "", value: "" });
                  }}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
