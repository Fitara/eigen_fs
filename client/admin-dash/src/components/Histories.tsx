import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchHistory, selectHistory } from '../redux/historySlice';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(selectHistory);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  interface RecordType {
  createdAt: string;
  updatedAt: string;
}

  const columns = [
    {
      title: 'Book Code',
      dataIndex: ['Book', 'code'],
      key: 'bookCode',
    },
    {
      title: 'Book Title',
      dataIndex: ['Book', 'title'],
      key: 'bookTitle',
    },
    {
      title: 'Member Code',
      dataIndex: ['Member','code'],
      key: 'memberCode',
    },
    {
      title: 'Member Name',
      dataIndex: ['Member', 'name'],
      key: 'memberName',
    },
    {
      title: 'Borrow',
      dataIndex: 'createdAt',
      className: 'capitalize-text',
      key: 'status',
      render: (text: string) => formatDate(text),
    },
    {
      title: 'Return',
      dataIndex: 'updatedAt',
      key: 'date',
      render: (text: string, record: RecordType) => {
        const borrowDate = new Date(record.createdAt);
        const returnDate = new Date(text);

        return returnDate > borrowDate ? formatDate(text) : '';
      },
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="id" />
    </div>
  );
};

export default History;
