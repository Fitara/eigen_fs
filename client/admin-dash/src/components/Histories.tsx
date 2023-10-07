import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchHistory, selectHistory } from '../redux/historySlice';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(selectHistory);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

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
      title: 'Status',
      dataIndex: 'status',
      className: 'capitalize-text',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text: string) => formatDate(text),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="id" />
    </div>
  );
};

export default History;
