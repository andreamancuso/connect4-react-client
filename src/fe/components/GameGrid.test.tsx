import * as React from 'react';
import { JSDOM } from 'jsdom';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import GameGrid from '../../../src/fe/components/GameGrid';
import { getGrid } from '../../../src/lib/grid';
import { Row, Col, Avatar } from 'antd';

const { shallow } = Enzyme;

Enzyme.configure({ adapter: new Adapter() });

const globalAny: any = global;

describe('<GameGrid/>', () => {
  let props;

  beforeEach(() => {
    const dom = new JSDOM(`<!doctype html><html><body></body></html>`);
    globalAny.window = dom.window;
    globalAny.document = dom.window.document;

    props = {
      grid: getGrid(),
      colClick: () => {}
    };
  });

  afterEach(() => {
    globalAny.window = undefined;
    globalAny.document = undefined;
  });

  it('renders as expected', () => {
    const wrapper = shallow(<GameGrid {...props} />);

    expect(wrapper.find(Row).length).toEqual(7);
    expect(wrapper.find(Col).length).toEqual(42);
    expect(wrapper.find(Avatar).length).toEqual(42);
    expect(wrapper.find('.grid__coin--player-0').length).toEqual(42);
  });
});
