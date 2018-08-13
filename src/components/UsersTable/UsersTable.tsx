import * as React from 'react';
import { Table, Divider, Button, Icon } from 'antd';
import moment from 'moment';
import { DATE_FORMAT_STORAGE, DATE_FORMAT_DISPLAY } from '../../constants';

interface Props {
  data: Users;
  loading: boolean;
  editItem: (record: User) => void;
  deleteItem: (id: number) => void;
}

class UsersTable extends React.Component<Props, {}> {
  render() {
    const { data, loading, editItem, deleteItem } = this.props;
    const columns = [{
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Дата рождения',
      dataIndex: 'birthdate',
      key: 'birthdate',
      render: (text: string, record: User) => (
        text ? moment(text, DATE_FORMAT_STORAGE).format(DATE_FORMAT_DISPLAY) : ''
      ),
    }, {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
    }, {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: 'Действия',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: User) => (
        <span>
          <Button onClick={() => editItem(record)}><Icon type="edit" /></Button>
          <Divider type="vertical" />
          <Button onClick={() => deleteItem(record.id)}><Icon type="close-circle" /></Button>
        </span>
      ),
    }];

    return (
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={false}
      />
    );
  }
}

export default UsersTable;
