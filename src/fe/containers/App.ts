import {connect} from "react-redux";

import App from '../components/App';
import {GenericDispatch, IState} from "../types";
import {initialActionThunk} from "../thunks/game";

interface IStateFromProps {

}

interface IDispatchFromProps {
    initialAction: Function,
}

const mapStateToProps = (state: IState): IStateFromProps => ({

});

const mapDispatchToProps = (dispatch: GenericDispatch): IDispatchFromProps => ({
    initialAction() {
        dispatch(initialActionThunk());
    }
});

export default connect<IStateFromProps, IDispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(App);
