import { OptionType, QuestionRadionPropsType } from "./interface";
import { FC, useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";

const PropsComponent: FC<QuestionRadionPropsType> = (
  props: QuestionRadionPropsType,
) => {
  const { title, isVertical, options = [], value, onChange, disable } = props;
  const [form] = Form.useForm();
  function handleValuesChange() {
    const values = form.getFieldsValue();

    if (values.options) {
      // 需要清除掉text indefined空的选项
      values.options = values.options.filter(
        (item: { text: null }) => !(item.text == null),
      );
    }

    // 遍历所有的选项，如果value为空，则补齐
    const { options = [] } = values;
    options.forEach((option: OptionType) => {
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
      options,
      value,
    });
  }, [title, isVertical, options, value]);
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
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
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的可能选项（可删除） */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前 formitem获取的是当前这一个的 text */}
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((item: OptionType) => {
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
                    {index > 1 && (
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
      <Form.Item label="默认选中" name="value">
        <Select value={value}>
          {options.map(({ text, value }) => {
            return (
              <Select.Option key={value} value={value} defaultValue={text}>
                {text}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
