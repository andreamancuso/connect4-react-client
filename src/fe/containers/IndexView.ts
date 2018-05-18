import {connect} from "react-redux";

import IndexView from '../components/IndexView';

import {GenericDispatch, IState} from "../types";
import {createGameThunk} from "../thunks/game";
import {setPlayerName} from "../actions/game";
import {PlayerCoinSlot} from "../../types";

export interface ISetPlayerName {
    (player1or2: PlayerCoinSlot, name: string): void
}

interface IStateFromProps {
    player1Name: string,
    player2Name: string,
}

interface IDispatchFromProps {
    beginNewGame: () => Promise<string>,
    setPlayerName: Function,
}

const mapStateToProps = (state: IState): IStateFromProps => ({
    player1Name: state.game.selectedGame.data.player1,
    player2Name: state.game.selectedGame.data.player2,
});

const mapDispatchToProps = (dispatch: GenericDispatch): IDispatchFromProps => ({
    beginNewGame(): Promise<string> {
        return dispatch(createGameThunk());
    },
    setPlayerName(player1or2: PlayerCoinSlot, name: string): void {
        dispatch(setPlayerName(player1or2, name));
    }
});

export default connect<IStateFromProps, IDispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
