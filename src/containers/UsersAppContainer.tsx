import * as React from 'react';
import { getDemoData } from 'api';
import read from 'api/read';
import UserForm from 'components/UserFrom';
import UsersTable from 'components/UsersTable';

interface State {
  users: Users;
  fetching: boolean;
  error?: string;
  editingUser?: number;
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

  }

  componentDidMount() {
    // this.loadDemoData();
    this.loadData();
  }

  /**
   * Загружает демо юзеров
   */
  loadDemoData() {
    this.setState({ fetching: true });
    getDemoData()
      .then(data => setTimeout(() => this.setState({ users: data, fetching: false }), 1500))
      .catch(error => this.setState({ fetching: false, error }));
  }

  /**
   * Загружает данные из хранилища
   */
  loadData() {
    read().then(data => this.setState({ fetching: false, users: data }));
  }

  editUser(id: number) {
    this.setState({ editingUser: id });
  }

  render() {
    const { users, fetching, editingUser } = this.state;
    return (
      <div className="App">
        <h1>CRUD App</h1>
        <UserForm
          editingUser={editingUser}
          onSubmit={this.loadData}
        />
        <UsersTable
          data={users}
          loading={fetching}
          editItem={this.editUser}
        />
      </div>
    );
  }
}

export default UsersAppContainer;
