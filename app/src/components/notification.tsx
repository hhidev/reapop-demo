import * as React from 'react';
import NotificationSystem, { addNotification as notify } from 'reapop';
import { connect } from 'react-redux';
import theme from 'reapop-theme-wybo';

interface Props {
  notifyAction: () => void;
}

const Notification: React.FunctionComponent<Props> = props => {
  const onNotify = () => {
    props.notifyAction();
  };

  return (
    <div>
      <button onClick={e => onNotify()}>notify</button>
      <NotificationSystem theme={theme} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  notifyAction: () => dispatch(notify({
    title: 'Welcome',
    message: 'you clicked on the button',
    status: 'success',
    dismissible: true,
    dismissAfter: 5000
  }))
});

const mapStateToProps = (state, Props) => {
  return Props;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);