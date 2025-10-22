import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Form, Input, InputNumber, Table } from 'antd';
import type { IEntry, IModalProps } from '../../types/types';
import { useEntryStore, useModalStore } from '../../store/store';
import {PlusOutlined} from '@ant-design/icons'


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
  const [data, setData] = useState<IEntry[]>([]);
  const [editingKey, setEditingKey] = useState('');

  // const isEditing = (record: IEntry) => record.id.toString() === editingKey;

  const entriesData = useEntryStore()
  const modalStore = useModalStore()

  React.useEffect(() => {
    setData(entriesData.entries.map(e => {
      return {...e, date: new Date(e.date).toLocaleString("ru-RU")} as any
    }))
  }, [entriesData.entries])


  const cancel = () => {
    setEditingKey('');
  };

  const columnsData = [
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
      title: (<span className="flexTableHeader">
        category
        <Button 
          style={{
            marginRight: 10
          }}
          size='small'
          variant='solid'
          color='cyan'
          icon={<PlusOutlined />}
          onClick={() => modalStore.newCategory.setOpenState(true)}
          />
      </span>)
      ,
      dataIndex: 'categoryName',
      width: '40%',
      editable: true,
    },
  ];

  const columns: TableProps<IEntry>['columns'] = columnsData.map((col, i) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      key: i,
      onCell: (record: IEntry) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title as any,
        // editing: isEditing(record),
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
        columns={columns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel }}
        size="small"
      />
    </Form>
  );
};

export default MainTable;
