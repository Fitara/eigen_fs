import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Form } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMembers, selectMembers } from '../redux/memberSlice';
import { fetchHistory, selectHistory } from '../redux/historySlice';
import { returnBook } from '../redux/booksSlice';

interface Member {
  id: number;
  code: string;
  name: string;
  booked: number;
  isPenalize: boolean;
}

const Members: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: memberData, loading: memberLoading } = useAppSelector(selectMembers);
  const { data: historyData } = useAppSelector(selectHistory);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleReturnClick = async (member: Member) => {
    setIsModalVisible(true);
    form.setFieldsValue({ memberId: member.id });
    setSelectedMember(member);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleReturn = async () => {
    try {
      const values = await form.validateFields();
      dispatch(returnBook(values.bookId, values.memberId))
      handleCancel();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (record: Member) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => handleReturnClick(record)}
            disabled={record.booked === 0} 
          >
            Return
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={memberData} columns={columns} loading={memberLoading} rowKey="id" />

      <Modal
        title={`Return Book - ${selectedMember ? selectedMember.name : ''}`}
        open={isModalVisible}
        onOk={handleReturn}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to return this book?</p>
        {/* Tampilkan daftar buku yang dipinjam oleh member di sini */}
        {selectedMember && (
          <ul>
            {historyData
              .filter((history) => history.memberId === selectedMember.id)
              .map((history) => (
                <li key={history.id}>{history.Book.title}</li>
              ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default Members;
