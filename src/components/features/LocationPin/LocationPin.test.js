import React from 'react';
import { shallow } from 'enzyme';
import { LocationPinComponent } from './LocationPin';

describe('Component LocationPin', () => {
  it('should render without crashing', () => {


    const component = shallow(<LocationPinComponent />);
    expect(component).toBeTruthy();
  });
});
