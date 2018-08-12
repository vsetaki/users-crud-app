import * as React from 'react';
import { Table, Divider, Button } from 'antd';
import { deleteUser } from 'api';

interface Props {
  data: Users;
  loading: boolean;
  editItem: (id: number) => void;
}

const columns = [{
  title: 'ФИО',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Дата рождения',
  dataIndex: 'birthdate',
  key: 'birthdate',
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
      <a href="javascript:;">Изменить</a>
      <Divider type="vertical" />
      <Button onClick={() => deleteUser(record.id)}>Удалить</Button>
    </span>
  ),
}];

class UsersTable extends React.Component<Props, {}> {
  render() {
    const { data, loading } = this.props;
    return (
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="id"
        onRow={() => ({
          onClick: this.props.editItem,
        })}
      />
    );
  }
}

export default UsersTable;
