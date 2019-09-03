import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import Notification from './components/notification';

const App: React.FunctionComponent = props => {
  return (
    <Provider store={Store({})}>
      <Notification />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
