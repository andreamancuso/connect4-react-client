import {connect} from "react-redux";

import GameIndexView from '../components/GameIndexView';

import {GenericDispatch, State} from "../types";

interface StateFromProps {

}


interface DispatchFromProps {

}

const mapStateToProps = (state: State): StateFromProps => ({

});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({

});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(GameIndexView);
