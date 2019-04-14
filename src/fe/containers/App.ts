import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import App from '../components/App';
import { IState, ContainerDispatchType } from '../types';
import { initialActionThunk } from '../thunks/game';

interface IStateFromProps {}

interface IDispatchFromProps {
  initialAction: () => void;
}

const mapStateToProps: MapStateToProps<IStateFromProps, {}, IState> = (
  state
): IStateFromProps => ({});

const mapDispatchToProps: MapDispatchToProps<IDispatchFromProps, {}> = (
  dispatch: ContainerDispatchType
): IDispatchFromProps => ({
  initialAction() {
    dispatch(initialActionThunk());
  }
});

export default connect<IStateFromProps, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
