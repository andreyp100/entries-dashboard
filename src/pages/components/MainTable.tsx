import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Table } from 'antd';
import type { IEntry } from '../../types/types';
import { useEntryStore } from '../../store/store';


const originData = Array.from({ length: 100 }).map<IEntry>((_, i) => ({
  id: i,
  date: Date.now(),
  sum: Math.floor(Math.random() * 1000),
  category: "123",
  name: `Edward ${i}`,
}));

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: IEntry;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const MainTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IEntry[]>(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: IEntry) => record.id.toString() === editingKey;

  const entriesData = useEntryStore()

  React.useEffect(() => {
    setData(entriesData.entries)
  }, [entriesData.entries])


  const cancel = () => {
    setEditingKey('');
  };

  const columns = [
    {
      title: 'date',
      dataIndex: 'date',
      width: '20%',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'sum',
      dataIndex: 'sum',
      width: '15%',
      editable: true,
    },
    {
      title: 'category',
      dataIndex: 'category',
      width: '40%',
      editable: true,
    },
  ];

  const mergedColumns: TableProps<IEntry>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IEntry) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table<IEntry>
        components={{
          body: { cell: EditableCell },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel }}
        size="small"
      />
    </Form>
  );
};

export default MainTable;
