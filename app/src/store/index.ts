import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router';
import { reducer as notificationsReducer } from 'reapop';

const Index = history => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    notifications: notificationsReducer(),
  });

  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, applyMiddleware(thunk));
  } else if (process.env.NODE_ENV === 'development') {
    return createStore(rootReducer, applyMiddleware(logger, thunk));
  }
};

export default Index;
