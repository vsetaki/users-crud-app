import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import 'resources/main.less';
import UsersAppContainer from 'containers/UsersAppContainer';

ReactDOM.render(
  <UsersAppContainer />,
  document.getElementById('root') as HTMLElement
);
