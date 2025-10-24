import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Table } from 'antd';
import type { IEntry } from '../../types/types';
import { useEntryStore, useModalStore } from '../../store/store';
import {PlusOutlined} from '@ant-design/icons'


const MainTable: React.FC = () => {
  const [data, setData] = useState<IEntry[]>([]);

  const entriesData = useEntryStore()
  const modalStore = useModalStore()

  React.useEffect(() => {
    setData(entriesData.entries.map(e => {
      return {...e, date: new Date(e.date).toLocaleString("ru-RU")} as any
    }))
  }, [entriesData.entries])


  const columns = [
    {
      title: 'date',
      dataIndex: 'date',
      width: '20%',
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: 'sum',
      dataIndex: 'sum',
      width: '15%',
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
    },
  ];

  const columnsData: TableProps<IEntry>['columns'] = columns.map((col, i) => {
    return {
      ...col,
      key: i,
      onCell: (record: IEntry) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title as any,
      }),
    };
  });

  return (
      <Table<IEntry>
        bordered
        dataSource={data}
        columns={columnsData}
        rowClassName="editable-row"
        size="small"
        pagination={false}
      />
  );
};

export default MainTable;
