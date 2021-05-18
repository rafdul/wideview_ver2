import React from 'react';
import { shallow } from 'enzyme';
import { ApartmentBoxComponent } from './ApartmentBox';

describe('Component ApartmentBox', () => {
  it('should render without crashing', () => {

    const image = ['lorem', 'ipsum'];

    const component = shallow(<ApartmentBoxComponent image={image} link='#' />);
    expect(component).toBeTruthy();
  });
});
