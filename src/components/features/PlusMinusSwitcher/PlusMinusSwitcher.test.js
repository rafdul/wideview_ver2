import React from 'react';
import { shallow } from 'enzyme';
import { PlusMinusSwitcherComponent } from './PlusMinusSwitcher';

describe('Component PlusMinusSwitcher', () => {
  it('should render without crashing', () => {


    const component = shallow(<PlusMinusSwitcherComponent />);
    expect(component).toBeTruthy();
  });
});
