import {connect} from "react-redux";

import IndexView from '../components/IndexView';

import {GenericDispatch, State} from "../types";
import {createGameThunk} from "../thunks/game";
import {setPlayerName} from "../actions/game";
import {PlayerCoinSlot} from "../../types";

export interface ISetPlayerName {
    (player1or2: PlayerCoinSlot, name: string): void
}

interface StateFromProps {
    player1Name: string,
    player2Name: string,
}

interface DispatchFromProps {
    beginNewGame: () => Promise<string>,
    setPlayerName: Function,
}

const mapStateToProps = (state: State): StateFromProps => ({
    player1Name: state.game.selectedGame.data.player1,
    player2Name: state.game.selectedGame.data.player2,
});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({
    beginNewGame(): Promise<string> {
        return dispatch(createGameThunk());
    },
    setPlayerName(player1or2: PlayerCoinSlot, name: string): void {
        dispatch(setPlayerName(player1or2, name));
    }
});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
