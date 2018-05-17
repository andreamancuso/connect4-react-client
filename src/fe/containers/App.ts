import {connect} from "react-redux";

import App from '../components/App';
import {GenericDispatch, State} from "../types";
import {initialActionThunk} from "../thunks/game";

interface StateFromProps {

}

interface DispatchFromProps {
    initialAction: Function,
}

const mapStateToProps = (state: State): StateFromProps => ({

});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({
    initialAction() {
        dispatch(initialActionThunk());
    }
});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(App);
