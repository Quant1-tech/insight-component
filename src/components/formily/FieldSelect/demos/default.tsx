import React from 'react';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem } from '@formily/antd';
import { FieldSelect } from '@antv/insight-component';
import 'antd/dist/antd.css';

const FieldList = [
  { type: 'string', lable: '区域名称', value: 'name', typeColor: 'green', typeName: '文本' },
  { type: 'number', lable: '区域编码', value: 'adcode', typeColor: 'gold', typeName: '数值' },
];

const form = createForm({
  initialValues: { fillField: 'adcode' },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FieldSelect,
  },
});

const schema = {
  type: 'object',
  properties: {
    fillField: {
      type: 'string',
      title: '填充字段',
      'x-decorator': 'FormItem',
      'x-component': 'FieldSelect',
      'x-decorator-props': {
        tooltip: '选中一个数值字段作为填充字段',
      },
      'x-component-props': {
        allowClear: true,
        placeholder: '请选择字段',
      },
      enum: [...FieldList],
    },
  },
};

export default () => {
  return (
    <Form form={form} style={{ width: '300px' }}>
      <SchemaField schema={schema} />
      <FormConsumer>
        {() => (
          <code>
            <pre>{JSON.stringify(form.values, null, 2)}</pre>
          </code>
        )}
      </FormConsumer>
    </Form>
  );
};
