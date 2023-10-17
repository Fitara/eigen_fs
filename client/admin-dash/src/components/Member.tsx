import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Input, Select, Form } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMembers, selectMembers } from '../redux/memberSlice';
import { fetchHistory, selectHistory } from '../redux/historySlice';
import { returnBook } from '../redux/booksSlice';

interface Member {
  id: number;
  code: string;
  name: string;
  isPenalize: boolean;
  BookHistories: [];
}

const Members: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: memberData } = useAppSelector(selectMembers);
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
      await dispatch(returnBook(values.bookId, values.memberId))
      
      fetchMembers();
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
            disabled={record.BookHistories.length === 0}
          >
            Return
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={memberData}
        columns={columns}
        rowKey={(record) => record.id.toString()}
      />
      <Modal
        title={`Member - ${selectedMember ? selectedMember.name : ''}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="default" className='button' onClick={handleReturn}>
            Return
          </Button>,
        ]}
      >
        <Form form={form} name="returnForm">
          <Form.Item
            name="memberId"
            hidden
          >
          <Input />
          </Form.Item>
          <Form.Item
            name="bookId"
            label="Book"
            rules={[
              {
                required: true,
                message: 'Please select a book!',
              },
            ]}
          >
            <Select>
              {historyData
                .filter((history) => history.memberId === selectedMember?.id
                && history.status === 'borrowed')
                .map((history) => (
                  <Select.Option
                    key={history.Book.id}
                    value={history.Book.id}
                  >
                    {history.Book.title}
                  </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Members;
