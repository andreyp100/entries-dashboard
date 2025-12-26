import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import type { IEntry } from '../../types/types';
import { useEntryStore } from '../../store/store';


const MainTable: React.FC = () => {
  const [data, setData] = useState<IEntry[]>([]);

  const entriesData = useEntryStore()

  React.useEffect(() => {
    setData(entriesData.entries.map(e => {
      return {...e, date: new Date(e.date).toLocaleString("ru-RU")} as IEntry
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
      title: "category",
      dataIndex: 'categoryName',
      width: '40%',
    },
  ];

  const columnsData: TableProps<IEntry>['columns'] = columns.map((col, i) => {
    return {
      ...col,
      key: i,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#bbdee7ff"
        }
      }),
      onCell: (record: IEntry) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title as any,
        style: {
          padding: "3px",
          paddingLeft: "10px",
          backgroundColor: "#e1e7eeff",
          fontSize: "0.875rem"
        }
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
