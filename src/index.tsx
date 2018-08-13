import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'resources/main.less';
import './index.css';
import UsersAppContainer from 'containers/UsersAppContainer';

ReactDOM.render(
  <UsersAppContainer />,
  document.getElementById('root') as HTMLElement
);
