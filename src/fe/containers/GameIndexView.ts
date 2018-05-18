import {connect} from "react-redux";

import GameIndexView from '../components/GameIndexView';

import {GenericDispatch, IState} from "../types";

interface IStateFromProps {

}


interface IDispatchFromProps {

}

const mapStateToProps = (state: IState): IStateFromProps => ({

});

const mapDispatchToProps = (dispatch: GenericDispatch): IDispatchFromProps => ({

});

export default connect<IStateFromProps, IDispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(GameIndexView);
