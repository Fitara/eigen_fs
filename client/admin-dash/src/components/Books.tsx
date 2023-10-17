import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMembers, selectMembers } from '../redux/memberSlice';
import {
  fetchBooks,
  selectBooks,
  borrowBook,
  borrowBookSuccess,
  borrowBookFailure,
} from '../redux/booksSlice';
import { toast } from 'react-toastify';

interface Book {
  id: number;
  code: string;
  title: string;
  author: string;
  stock: number;
}

const Books: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: booksData, borrowSuccessMessage, error } = useAppSelector(selectBooks);
  const { data: membersData } = useAppSelector(selectMembers);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchMembers());
  }, [dispatch]);

  useEffect(() => {
    if (borrowSuccessMessage) {
      toast.success(borrowSuccessMessage, { autoClose: 3000 });
      dispatch(borrowBookSuccess(''));
    }
  }, [borrowSuccessMessage, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      dispatch(borrowBookFailure(''));
    }
  }, [error, dispatch]);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: '10%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: '20%',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: '10%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (record: Book) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => handleBorrowClick(record)}
            // placeholder="Member"
            disabled={record.stock === 0} 
          >
            Borrow
          </Button>
        </Space>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [form] = Form.useForm();

  const handleBorrowClick = (book: Book) => {
    setIsModalVisible(true);
    form.setFieldsValue({ bookId: book.id });
    setSelectedBook(book);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleBorrow = async () => {
    try {
      const values = await form.validateFields();
      dispatch(borrowBook(values.bookId, values.memberId));
      handleCancel();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <div>
      <Table
        dataSource={booksData}
        columns={columns}
        rowKey={(record) => record.id.toString()}
      />
      <Modal
        title={`Borrow Book - ${selectedBook ? selectedBook.title : ''}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="default" className='button' onClick={handleBorrow}>
            Borrow
          </Button>,
        ]}
      >
        <Form form={form} name="borrowForm">
          <Form.Item
            name="bookId"
            hidden
          >
          <Input />
          </Form.Item>
          <Form.Item
            name="memberId"
            label="Member"
            rules={[
              {
                required: true,
                message: 'Please select a member!',
              },
            ]}
          >
            <Select placeholder="Choose a member">
              {membersData.map((member) => (
                <Select.Option key={member.id} value={member.id}>
                  {member.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Books;
