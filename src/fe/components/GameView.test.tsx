import * as React from 'react';
import * as sinon from 'sinon';
import { JSDOM } from 'jsdom';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import GameView from '../../../src/fe/components/GameView';
import { getGrid } from '../../../src/lib/grid';
import GameGrid from '../../../src/fe/components/GameGrid';
import { CoinSlot, GameResult } from '../../../src/types';

const { shallow } = Enzyme;

Enzyme.configure({ adapter: new Adapter() });

const globalAny: any = global;

describe('<GameView/>', () => {
  let props;

  beforeEach(() => {
    const dom = new JSDOM(`<!doctype html><html><body></body></html>`);
    globalAny.window = dom.window;
    globalAny.document = dom.window.document;

    props = {
      grid: getGrid(),
      gameResult: GameResult.InProgress,
      nextPlayer: CoinSlot.Player1,
      nextPlayerName: 'Andy',
      match: {
        params: {
          id: 'game-id'
        }
      },
      fetchGame: sinon.spy()
    };
  });

  afterEach(() => {
    globalAny.window = undefined;
    globalAny.document = undefined;
  });

  it('renders as expected', () => {
    const wrapper = shallow(<GameView {...props} />);

    expect(wrapper.find(GameGrid).length).toEqual(1);

    expect(props.fetchGame.callCount).toEqual(1);
    expect(props.fetchGame.firstCall.args[0]).toEqual('game-id');
  });
});
