import * as React from 'react';
import { deleteUser } from 'api';
import read from 'api/read';
import UserForm from 'components/UserFrom';
import UsersTable from 'components/UsersTable';

interface State {
  users: Users;
  fetching: boolean;
  error?: string;
  editingUser?: User;
}

class UsersAppContainer extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      users: [],
      fetching: false,
    };

    this.loadData = this.loadData.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);

  }

  componentDidMount() {
    this.loadData();
  }

  /**
   * Загружает данные из хранилища
   */
  loadData() {
    read().then(data => this.setState({ fetching: false, users: data }));
  }

  /**
   * Устанавливает пользователя на редактирование
   */
  editUser(data: User) {
    this.setState({ editingUser: data });
  }

  /**
   * Удаляет пользователя по id
   */
  deleteUser(id: number) {
    deleteUser(id);
    this.loadData();
  }

  /**
   * Обновляем данные из хранилища на сабмит формы
   */
  handleSubmitForm() {
    this.setState({ fetching: true, editingUser: undefined });
    this.loadData();
  }

  render() {
    const { users, fetching, editingUser } = this.state;
    return (
      <div className="user-crud-app">
        <h1>CRUD App</h1>
        <UserForm
          editingUser={editingUser}
          onSubmit={this.handleSubmitForm}
        />
        <UsersTable
          data={users}
          loading={fetching}
          editItem={this.editUser}
          deleteItem={this.deleteUser}
        />
      </div>
    );
  }
}

export default UsersAppContainer;
